package com.rn.keyboard

import android.app.Activity
import android.graphics.Rect
import android.view.Gravity
import android.view.View
import android.view.ViewTreeObserver
import android.view.WindowManager
import android.widget.PopupWindow

object KeyboardInfo {
    const val HEIGHT_NOT_COMPUTED = -1
    const val STATE_UNKNOWN = -1
    const val STATE_CLOSED = 0
    const val STATE_OPENED = 1

    /**
     * Cached keyboard height. This will keep the last keyboard height value and not
     * it's current height
     */
    var keyboardHeight = HEIGHT_NOT_COMPUTED

    /**
     * Real time keyboard state
     */
    var keyboardState = STATE_UNKNOWN
}

class KeyboardProvider(private val activity: Activity) : PopupWindow(activity) {

    private var heightMax = 0;
    private var lastKeyboardHeight = -1
    private var resizableView: View
    private var parentView: View? = null
    private var keyboardListeners = ArrayList<KeyboardListener>()

    init {
        contentView = View.inflate(activity, R.layout.keyboard_popup, null)
        resizableView = contentView.findViewById(R.id.keyResizeContainer)
        softInputMode = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE or
                WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_VISIBLE
        inputMethodMode = PopupWindow.INPUT_METHOD_NEEDED

        width = 0
        height = WindowManager.LayoutParams.MATCH_PARENT

        parentView = activity.window.decorView.rootView
        parentView?.post {
            resizableView.viewTreeObserver.addOnGlobalLayoutListener(getGlobalLayoutListener())
            if (!isShowing && parentView?.windowToken != null) {
                showAtLocation(parentView, Gravity.NO_GRAVITY, 0, 0)
            }
        }
    }

    fun addKeyboardListener(listener: KeyboardListener) {
        keyboardListeners.add(listener)
    }

    fun removeKeyboardListener() {
        keyboardListeners.clear()
    }

    private fun getGlobalLayoutListener() = ViewTreeObserver.OnGlobalLayoutListener {
        computeKeyboardState()
    }

    private fun computeKeyboardState() {
        val rect = Rect()
        contentView.rootView.getWindowVisibleDisplayFrame(rect)
        val orientation = activity.resources.configuration.orientation
        
        if (rect.bottom > heightMax) {
            heightMax = rect.bottom;
        }
        val keyboardHeight = heightMax - rect.bottom
        KeyboardInfo.keyboardState = if (keyboardHeight > 0) KeyboardInfo.STATE_OPENED else KeyboardInfo.STATE_CLOSED
        if (keyboardHeight > 0) {
            KeyboardInfo.keyboardHeight = keyboardHeight
        }
        if (keyboardHeight != lastKeyboardHeight) {
            notifyKeyboardHeightChanged(keyboardHeight, orientation)
        }
        lastKeyboardHeight = keyboardHeight
    }

    private fun notifyKeyboardHeightChanged(height: Int, orientation: Int) {
        keyboardListeners.forEach {
            it.onHeightChanged(height)
        }
    }

    interface KeyboardListener {
        fun onHeightChanged(height: Int)
    }
}
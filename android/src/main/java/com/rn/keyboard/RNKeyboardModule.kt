package com.rn.keyboard

import android.util.Log
import android.view.WindowManager.LayoutParams
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

@Suppress("unused")
class RNKeyboardModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var keyboardProvider: KeyboardProvider? = null

    @ReactMethod
    fun setWindowSoftInputMode(mode: Int, promise: Promise) {
        try {
            UiThreadUtil.runOnUiThread {
                currentActivity?.window?.setSoftInputMode(mode)
                promise.resolve("success")
            }
        } catch (e: Exception) {
            promise.reject("error", e.toString())
        }
    }

    @ReactMethod
    fun startKeyboardListener() {

        try {
            UiThreadUtil.runOnUiThread {
                val mActivity = currentActivity
                if(mActivity != null) {
                    keyboardProvider = KeyboardProvider(mActivity)
                    keyboardProvider?.addKeyboardListener(object : KeyboardProvider.KeyboardListener{
                        override fun onHeightChanged(height: Int) {
                            emit(height)
                        }
                    })
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    @ReactMethod
    fun stopKeyboardListener() {
        try {
            keyboardProvider?.removeKeyboardListener();
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    override fun getName(): String {
        return "RNKeyboard"
    }

    fun emit(height: Int) {
        try {
            reactApplicationContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("KeyboardSizeChanges", height)
        } catch (e: InterruptedException) {
            e.printStackTrace()
        }
    }

    override fun getConstants(): Map<String, Any>? {
        var constants = HashMap<String, Any>()
        constants.put("SOFT_INPUT_ADJUST_NOTHING", LayoutParams.SOFT_INPUT_ADJUST_NOTHING)
        constants.put("SOFT_INPUT_ADJUST_PAN", LayoutParams.SOFT_INPUT_ADJUST_PAN)
        constants.put("SOFT_INPUT_ADJUST_RESIZE", LayoutParams.SOFT_INPUT_ADJUST_RESIZE)
        constants.put("SOFT_INPUT_ADJUST_UNSPECIFIED", LayoutParams.SOFT_INPUT_ADJUST_UNSPECIFIED)
        constants.put("SOFT_INPUT_IS_FORWARD_NAVIGATION", LayoutParams.SOFT_INPUT_IS_FORWARD_NAVIGATION)
        constants.put("SOFT_INPUT_MASK_ADJUST", LayoutParams.SOFT_INPUT_MASK_ADJUST)
        constants.put("SOFT_INPUT_MASK_STATE", LayoutParams.SOFT_INPUT_MASK_STATE)
        constants.put("SOFT_INPUT_MODE_CHANGED", LayoutParams.SOFT_INPUT_MODE_CHANGED)
        constants.put("SOFT_INPUT_STATE_ALWAYS_HIDDEN", LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN)
        constants.put("SOFT_INPUT_STATE_ALWAYS_VISIBLE", LayoutParams.SOFT_INPUT_STATE_ALWAYS_VISIBLE)
        constants.put("SOFT_INPUT_STATE_HIDDEN", LayoutParams.SOFT_INPUT_STATE_HIDDEN)
        constants.put("SOFT_INPUT_STATE_UNCHANGED", LayoutParams.SOFT_INPUT_STATE_UNCHANGED)
        constants.put("SOFT_INPUT_STATE_UNSPECIFIED", LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED)
        constants.put("SOFT_INPUT_STATE_VISIBLE", LayoutParams.SOFT_INPUT_STATE_VISIBLE)
        return constants;
    }

}

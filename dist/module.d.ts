/**
 * Native Event name, emitted from Android and iOS
 */
export declare const KEYBOARD_SIZE_EVENT_NAME = "KeyboardSizeChanges";
export declare type keyboardListenerCallback = (height: number) => void;
export declare enum SoftInputMode {
    SOFT_INPUT_ADJUST_NOTHING = "SOFT_INPUT_ADJUST_NOTHING",
    SOFT_INPUT_ADJUST_PAN = "SOFT_INPUT_ADJUST_PAN",
    SOFT_INPUT_ADJUST_RESIZE = "SOFT_INPUT_ADJUST_RESIZE",
    SOFT_INPUT_ADJUST_UNSPECIFIED = "SOFT_INPUT_ADJUST_UNSPECIFIED",
    SOFT_INPUT_IS_FORWARD_NAVIGATION = "SOFT_INPUT_IS_FORWARD_NAVIGATION",
    SOFT_INPUT_MASK_ADJUST = "SOFT_INPUT_MASK_ADJUST",
    SOFT_INPUT_MASK_STATE = "SOFT_INPUT_MASK_STATE",
    SOFT_INPUT_MODE_CHANGED = "SOFT_INPUT_MODE_CHANGED",
    SOFT_INPUT_STATE_ALWAYS_HIDDEN = "SOFT_INPUT_STATE_ALWAYS_HIDDEN",
    SOFT_INPUT_STATE_ALWAYS_VISIBLE = "SOFT_INPUT_STATE_ALWAYS_VISIBLE",
    SOFT_INPUT_STATE_HIDDEN = "SOFT_INPUT_STATE_HIDDEN",
    SOFT_INPUT_STATE_UNCHANGED = "SOFT_INPUT_STATE_UNCHANGED",
    SOFT_INPUT_STATE_UNSPECIFIED = "SOFT_INPUT_STATE_UNSPECIFIED",
    SOFT_INPUT_STATE_VISIBLE = "SOFT_INPUT_STATE_VISIBLE"
}
export declare class RNKeyboard {
    static isInitialized: boolean;
    static callbacks: keyboardListenerCallback[];
    /**
     * This is private method handling the native event listener logic
     * When fired it will invoke all the previously registered callbacks
     * @param height current keyboard height
     */
    private static keyboardListener;
    /**
     * @android only
     * Change the WindowSoftInput behavior at runtime
     * @param mode See SoftInputMode for all the options
     */
    static setWindowSoftInputMode(mode: SoftInputMode): any;
    /**
     * Invoke the provided callback every time the keyboard height changes (when it show/hide)
     * Note: when it invoke the first time it will listen to RNKeyboard native event
     * @param callback Callback that will be invoked with the current keyboard height
     */
    static addKeyboardListener(callback: keyboardListenerCallback): void;
    /**
     * Will remove a previously added callback with the addKeyboardListener method
     * @param callback Callback to remove
     */
    static removeKeyboardListener(callback: keyboardListenerCallback): void;
}

import {
  PixelRatio,
  NativeModules,
  NativeEventEmitter,
  Platform,
} from 'react-native';

const { Keyboard: Keyboard } = NativeModules;

const SOFT_INPUT_MODES = {
  SOFT_INPUT_ADJUST_NOTHING: Keyboard.SOFT_INPUT_ADJUST_NOTHING,
  SOFT_INPUT_ADJUST_PAN: Keyboard.SOFT_INPUT_ADJUST_PAN,
  SOFT_INPUT_ADJUST_RESIZE: Keyboard.SOFT_INPUT_ADJUST_RESIZE,
  SOFT_INPUT_ADJUST_UNSPECIFIED: Keyboard.SOFT_INPUT_ADJUST_UNSPECIFIED,
  SOFT_INPUT_IS_FORWARD_NAVIGATION: Keyboard.SOFT_INPUT_IS_FORWARD_NAVIGATION,
  SOFT_INPUT_MASK_ADJUST: Keyboard.SOFT_INPUT_MASK_ADJUST,
  SOFT_INPUT_MASK_STATE: Keyboard.SOFT_INPUT_MASK_STATE,
  SOFT_INPUT_MODE_CHANGED: Keyboard.SOFT_INPUT_MODE_CHANGED,
  SOFT_INPUT_STATE_ALWAYS_HIDDEN: Keyboard.SOFT_INPUT_STATE_ALWAYS_HIDDEN,
  SOFT_INPUT_STATE_ALWAYS_VISIBLE: Keyboard.SOFT_INPUT_STATE_ALWAYS_VISIBLE,
  SOFT_INPUT_STATE_HIDDEN: Keyboard.SOFT_INPUT_STATE_HIDDEN,
  SOFT_INPUT_STATE_UNCHANGED: Keyboard.SOFT_INPUT_STATE_UNCHANGED,
  SOFT_INPUT_STATE_UNSPECIFIED: Keyboard.SOFT_INPUT_STATE_UNSPECIFIED,
  SOFT_INPUT_STATE_VISIBLE: Keyboard.SOFT_INPUT_STATE_VISIBLE,
};

const eventEmitter = new NativeEventEmitter(Keyboard);

/**
 * Native Event name, emitted from Android and iOS
 */
export const KEYBOARD_SIZE_EVENT_NAME = 'KeyboardSizeChanges';

export type keyboardListenerCallback = (height: number) => void;

export enum SoftInputMode {
  SOFT_INPUT_ADJUST_NOTHING = 'SOFT_INPUT_ADJUST_NOTHING',
  SOFT_INPUT_ADJUST_PAN = 'SOFT_INPUT_ADJUST_PAN',
  SOFT_INPUT_ADJUST_RESIZE = 'SOFT_INPUT_ADJUST_RESIZE',
  SOFT_INPUT_ADJUST_UNSPECIFIED = 'SOFT_INPUT_ADJUST_UNSPECIFIED',
  SOFT_INPUT_IS_FORWARD_NAVIGATION = 'SOFT_INPUT_IS_FORWARD_NAVIGATION',
  SOFT_INPUT_MASK_ADJUST = 'SOFT_INPUT_MASK_ADJUST',
  SOFT_INPUT_MASK_STATE = 'SOFT_INPUT_MASK_STATE',
  SOFT_INPUT_MODE_CHANGED = 'SOFT_INPUT_MODE_CHANGED',
  SOFT_INPUT_STATE_ALWAYS_HIDDEN = 'SOFT_INPUT_STATE_ALWAYS_HIDDEN',
  SOFT_INPUT_STATE_ALWAYS_VISIBLE = 'SOFT_INPUT_STATE_ALWAYS_VISIBLE',
  SOFT_INPUT_STATE_HIDDEN = 'SOFT_INPUT_STATE_HIDDEN',
  SOFT_INPUT_STATE_UNCHANGED = 'SOFT_INPUT_STATE_UNCHANGED',
  SOFT_INPUT_STATE_UNSPECIFIED = 'SOFT_INPUT_STATE_UNSPECIFIED',
  SOFT_INPUT_STATE_VISIBLE = 'SOFT_INPUT_STATE_VISIBLE',
}

export class RNKeyboard {
  static isInitialized = false;
  static callbacks: keyboardListenerCallback[] = [];

  /**
   * This is private method handling the native event listener logic
   * When fired it will invoke all the previously registered callbacks
   * @param height current keyboard height
   */
  private static keyboardListener(height: number) {
    const keyboardHeight =
      Platform.OS === 'android' ? height / PixelRatio.get() : height;
    RNKeyboard.callbacks.forEach(callback => {
      callback(keyboardHeight);
    });
  }

  /**
   * @android only
   * Change the WindowSoftInput behavior at runtime
   * @param mode See SoftInputMode for all the options
   */
  static setWindowSoftInputMode(mode: SoftInputMode) {
    return Keyboard.setWindowSoftInputMode(SOFT_INPUT_MODES[mode]);
  }

  /**
   * Invoke the provided callback every time the keyboard height changes (when it show/hide)
   * Note: when it invoke the first time it will listen to RNKeyboard native event
   * @param callback Callback that will be invoked with the current keyboard height
   */
  static addKeyboardListener(callback: keyboardListenerCallback) {
    if (!RNKeyboard.isInitialized) {
      Keyboard.startKeyboardListener();
      eventEmitter.addListener(
        KEYBOARD_SIZE_EVENT_NAME,
        RNKeyboard.keyboardListener,
      );

      RNKeyboard.isInitialized = true;
    }
    RNKeyboard.callbacks.push(callback);
  }

  /**
   * Will remove a previously added callback with the addKeyboardListener method
   * @param callback Callback to remove
   */
  static removeKeyboardListener(callback: keyboardListenerCallback) {
    RNKeyboard.callbacks = RNKeyboard.callbacks.filter(cb => cb !== callback);
  }
}

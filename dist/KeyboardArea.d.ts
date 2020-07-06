import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface IProps {
    style?: StyleProp<ViewStyle>;
    /**
     * If true, will keep the the keyboard area open even if the Keyboard is dismiss
     * Useful to switch to another view and then come back to the Keyboard view
     * NOTE: if false will not close the keyboard area to avoid layout jumping, use the close() method
     */
    isOpen?: boolean;
    /**
     * Content to be placed under the Keyboard
     */
    children: ReactNode;
    /**
     * Until the keyboard shows once, we don't know it real height,
     * so we need a initial default height
     * (Default: 250)
     */
    initialHeight?: number;
    /**
     * Minimum height for manually open view
     * (Default: 250)
     */
    minHeight?: number;
    /**
     * Event fired when keyboard height changes
     */
    onChange?: (isOpen: boolean, height: number) => void;
}
export declare type KeyboardAreaRef = {
    isOpen: () => boolean;
    open: () => void;
    close: () => void;
};
export declare const KeyboardArea: React.ForwardRefExoticComponent<IProps & React.RefAttributes<KeyboardAreaRef>>;
export {};

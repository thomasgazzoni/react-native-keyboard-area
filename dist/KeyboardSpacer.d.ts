import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface IProps {
    style?: StyleProp<ViewStyle>;
    /**
     * If true, will keep the the keyboard area open even if the Keyboard is dismiss
     * Useful to switch to another view and then come back to the Keyboard view
     */
    isOpen?: boolean;
    /**
     * Content to be placed under the Keyboard
     */
    children: ReactNode;
    /**
     * Event fired when keyboard height changes
     */
    onChange?: (isOpen: boolean, height: number) => () => void;
}
export declare type KeyboardSpacerRef = {
    isOpen: () => boolean;
    open: () => void;
    close: () => void;
};
export declare const KeyboardSpacer: React.ForwardRefExoticComponent<IProps & React.RefAttributes<KeyboardSpacerRef>>;
export {};

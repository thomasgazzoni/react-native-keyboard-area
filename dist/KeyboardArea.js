import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import { View } from 'react-native';
import { RNKeyboard } from './module';
export const KeyboardArea = forwardRef(({ style, children, isOpen: externalOpen, initialHeight = 250, minHeight = 250, onChange, }, ref) => {
    const isOpen = useRef(false);
    const forceOpen = useRef(false);
    const keyboardHeight = useRef(initialHeight);
    const [currentHeight, setCurrentHeight] = useState(0);
    const open = () => {
        isOpen.current = true;
        setCurrentHeight(keyboardHeight.current);
        if (onChange) {
            onChange(true, keyboardHeight.current);
        }
    };
    const close = () => {
        isOpen.current = false;
        setCurrentHeight(0);
        if (onChange) {
            onChange(false, 0);
        }
    };
    useImperativeHandle(ref, () => ({
        isOpen: () => isOpen.current,
        open,
        close,
    }));
    useEffect(() => {
        const keyboardHeightChanged = (height) => {
            if (height > 0 && height !== keyboardHeight.current) {
                keyboardHeight.current = height > minHeight ? height : minHeight;
            }
            const needToOpen = forceOpen.current || height > 0;
            if (needToOpen) {
                open();
            }
            else {
                close();
            }
        };
        RNKeyboard.addKeyboardListener(keyboardHeightChanged);
        return () => {
            RNKeyboard.removeKeyboardListener(keyboardHeightChanged);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        forceOpen.current = externalOpen || false;
        if (forceOpen.current) {
            open();
        }
    }, [externalOpen]); // eslint-disable-line react-hooks/exhaustive-deps
    return <View style={[{ height: currentHeight }, style]}>{children}</View>;
});

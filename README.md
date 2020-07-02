# react-native-keyboard-area

Sometimes we don't want the main Page View to move up when the Virtual Keyboard appear, but we want a View with the Keyboard Height

## Getting started

`$ yarn add react-native-keyboard-area`

### Why this library?

### How it work in React Native now?

On iOS:
React native provides a component called **KeyboardAvoidingView**, wrap your page with that and it will move up the view when the keyboard appears.

On Android:
If in the **AndroidManifest.xml** for the **windowSoftInputMode** we use **adjustResize**, the entire app view will move up when the keyboard appears.
We can also use the **KeyboardAvoidingView** component on android, with

import Foundation

@objc(RNKeyboard)
class RNKeyboard: RCTEventEmitter {
    
    @objc func startKeyboardListener() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(keyboardWasShown(_:)),
            name: UIResponder.keyboardWillShowNotification,
            object: nil
        )
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(keyboardWasHidden(_:)),
            name: UIResponder.keyboardWillHideNotification,
            object: nil
        )
    }

    @objc func stopKeyboardListener() {

    }
    
    @objc func keyboardWasShown(_ notification : Notification) {
        let info = notification.userInfo
        
        if let userInfo = info, let keyboardFrameValue = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue {
            let keyboardRect = keyboardFrameValue.cgRectValue
            let keyboardHeight = keyboardRect.height
            emit(height: keyboardHeight)
        }
    }
    
    @objc func keyboardWasHidden(_ notification : Notification) {
        emit(height: 0.00)
    }

    @objc func emit(height: CGFloat) {
        sendEvent(withName: "KeyboardSizeChanges", body: height)
    }

    override func supportedEvents() -> [String]! {
        return ["KeyboardSizeChanges"]
    }

    override func constantsToExport() -> [AnyHashable : Any]!  {
        return ["KeyboardSizeChanges": 0]
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |spec|

  spec.name         = "RNKeyboard"
  spec.version      = package['version']
  spec.summary      = package["description"]
  spec.description  = package["description"]

  spec.author       = package["author"]
  spec.homepage     = package["homepage"]
  spec.license      = package["license"]
  spec.platform     = :ios, "8.0"

  spec.source       = { :git => package['repository']['url'], :tag => "v#{package['version']}" }
  spec.source_files = "ios/*.{h,m,swift}"

  spec.dependency   "React"

end

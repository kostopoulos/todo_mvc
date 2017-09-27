Konacha.configure do |config|
  config.spec_dir     = 'spec/javascripts'
  config.spec_matcher = /_spec\.|_test\./
  config.stylesheets  = %w(application)
  config.driver       = :selenium_chrome
end if defined?(Konacha)
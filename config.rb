###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# dotenv for s3 creds
activate :dotenv

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # gzip assets on build
  activate :gzip
end

# gulp for jsx

# activate :external_pipeline,
#   name: :gulp,
#   command: build? ? './node_modules/gulp/bin/gulp.js buildProd' : './node_modules/gulp/bin/gulp.js default',
#   source: '.tmp/dist'

activate :external_pipeline,
  name: :webpack,
  command: build? ? './node_modules/webpack/bin/webpack.js --bail' : './node_modules/webpack/bin/webpack.js --watch -d',
  source: '.tmp/dist',
  latency: 1

ignore 'javascripts/*.jsx'

# disable layouts for share graphic pages
page '/graphic1.html', :layout => false
page '/graphic2.html', :layout => false
page '/graphic3.html', :layout => false
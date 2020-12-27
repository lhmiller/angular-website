upload_to_s3 () {
  # recursively delete all .DS_Store files
  find . -name '.DS_Store' -type f -delete

  # remove old built files before uploading new ones
  aws s3 rm $1 --recursive --exclude assets/*

  # upload built files to s3

  # index html
  aws s3 cp dist/lucas/index.html $1/index.html --content-type 'text/html; charset=utf-8'
  # code assets
  aws s3 cp dist/lucas $1 --recursive --exclude '*' --include '*.js' --exclude 'assets/*' --content-type 'application/javascript; charset=utf-8'
  aws s3 cp dist/lucas $1 --recursive --exclude '*' --include '*.css' --exclude 'assets/*' --content-type 'text/css; charset=utf-8'
  # media assets (only upload new/modified media files)
  aws s3 sync dist/lucas/assets $1/assets
}

upload_to_s3 s3://lucashmiller.com

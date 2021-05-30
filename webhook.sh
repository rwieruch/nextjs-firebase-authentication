git pull --rebase origin master
yarn install
cd src/data/courses
git pull --rebase origin master
cd ..
cd ..
cd ..
npm run build
pm2 restart courses.robinwieruch.de
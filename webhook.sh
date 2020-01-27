git pull --rebase origin master
npm install
cd content
git pull --rebase origin master
cd ..
npm run build
pm2 restart courses.robinwieruch.de
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
echo $branch
git checkout testing
git pull
git checkout $branch
git merge testing
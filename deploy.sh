function check_result(){
  if [ "$1" != "0" ]
  then
    echo "出错了，请检查！";
    exit 2;
  fi
}

cd ~/Desktop/Private/SungyWeb.github.io;
git pull;
rm -rf ~/Desktop/Private/SungyWeb.github.io/*;
check_result $?;
cp -rf ~/Desktop/Private/relearn/build/* ~/Desktop/Private/SungyWeb.github.io/;
check_result $?;

git add -A;
git commit -m "update";
git push;
check_result $?;

#! /bin/sh

today=$(date '+%Y%m%d')
zipName="backup_$today"

for num in $(seq 1 16);do
  list=`find day"$num" -type f | grep "\.js$"`
  if [ "$list" ]
  then
    for file in $list;do
      echo $file
      zip -r $zipName.zip ./$file
    done
  else 
    echo "day$num is empty"
  fi
done


scp -i /Users/rookiebox/Downloads/aws_boost.pem -r ~/workspace/boostcamp/day_mission/problems/backup_20190724.zip new_user2@ec2-3-112-2-133.ap-northeast-1.compute.amazonaws.com:/home/new_user2/backup

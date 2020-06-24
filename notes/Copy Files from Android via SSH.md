#On local Mac, enable remote login
sudo systemsetup -setremotelogin on

#SSH into Android phone. Cannot use port 22 on Android due to security restrictions
ssh -p 2222 192.168.0.103

#User is varr, pass is admin

#Path to images on phone using SSHelper app
/data/data/com.arachnoid.sshelper/files/home/SDCard/DCIM/Camera
/data/data/com.arachnoid.sshelper/files/home/SDCard/tencent/MicroMsg/WeChat

#Remotely transfer all files in DCIM back to my local machine
rsync -chavzP --stats /data/data/com.arachnoid.sshelper/files/home/SDCard/DCIM/Camera/* varr@192.168.0.112:/Users/varr/Downloads/transfer-from-android

#Remotely transfer images (no videos) back to my local machine
rsync -chavzP --stats /data/data/com.arachnoid.sshelper/files/home/SDCard/DCIM/Camera/*.jpg varr@192.168.0.112:/Users/varr/Downloads/transfer-from-android
rsync -chavzP --stats /data/data/com.arachnoid.sshelper/files/home/SDCard/tencent/MicroMsg/WeChat/*.jpg varr@192.168.0.112:/Users/varr/Downloads/transfer-from-android

#Remotely transfer videos (no images) back to my local machine
rsync -chavzP --stats /data/data/com.arachnoid.sshelper/files/home/SDCard/DCIM/Camera/*.mp4 varr@192.168.0.112:/Users/varr/Downloads/transfer-from-android
rsync -chavzP --stats /data/data/com.arachnoid.sshelper/files/home/SDCard/tencent/MicroMsg/WeChat/*.mp4 varr@192.168.0.112:/Users/varr/Downloads/transfer-from-android

#Put in password for varr user on local machine

#Wait, it might take a while to gather list of files

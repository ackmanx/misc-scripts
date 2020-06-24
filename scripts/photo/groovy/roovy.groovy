#!/usr/bin/env groovy

/*
 * TO INSTALL:
 * Install the Groovy runtime
 * Add an alias to the script so it looks for photos in the directory you run it in
 *   alias roovy='groovy ~/Applications/roovy.groovy'
 *
 * TO USE THIS SCRIPT:
 * $ roovy.groovy (chmod -x or 744 if needed)
 *
 * This script will search the current directory for jpg files.
 * If any are found, it checks for Exif data on each jpg.
 * It will then attempt to rename each jpg to the date taken on the image.
 *
 * THERE IS NO UNDO AFTER RUNNING THIS!
 *
 * Ex: image_with_exif.jpeg would get renamed to 2014-09-13 11.09.37.jpg
 *
 * Eric Majerus
 * 2014-10-17
 */

/*
 * There's no setup to create a Groovy script.
 * You simply make a .groovy file and then script without making it a class (Groovy will make it a class internally if you don't).
 * You can new up other classes to use in the script and those behave like any class does.
 * For this script, I just created a class with several static methods because it was easy to test with RoovyTest
 */

package com.molekulzyklop.roovy

println """
__________
\\______   \\____   _______  _____ __
|       _//  _ \\ /  _ \\  \\/ <   |  |
|    |   (  <_> |  <_> )   / \\___  |
|____|_  /\\____/ \\____/ \\_/  / ____|
       \\/                    \\/
"""

/*
 * First argument should be directory path to find files to rename, if provided
 */
RoovyMain.start()


@Grab(group = 'com.drewnoakes', module = 'metadata-extractor', version = '2.6.2')
import com.drew.imaging.jpeg.JpegMetadataReader
import com.drew.metadata.Metadata
import com.drew.metadata.exif.ExifSubIFDDirectory
import groovy.io.FileType

import java.nio.file.Files
import java.nio.file.Paths

class RoovyMain {

    static int imagesRenamedCounter = 0

    /*
     * Script starts here
     */
    static void start() {
        println "Searching in current directory (${Paths.get('.').toAbsolutePath()}) for images to rename..."
        List<File> imageList = generateImageFileList()

        if(imageList.size == 0) {
            println ''
            println "No image files found. Bye!"
            return
        }

        println "Found ${imageList?.size} image files..."
        List<Map<String, Object>> imagesToRename = generateImageListWithDateTaken(imageList)

        if(imagesToRename.size == 0) {
            println "Found no images to rename inside current directory. Bye!"
            return
        }

        println "Found ${imagesToRename.size} images with Exif data..."

        //TODO Should I create a dry-run mode that just outputs?
        println ''
        println "*Note: Image files with the same date taken (precise to seconds) will have a random salt appended to the filename"
        println ''
        println "Attempting to rename images with Exif data..."

        renameImages(imagesToRename)

        println ''
        println "Renamed images: ${imagesRenamedCounter} out of ${imagesToRename.size}"
    }

    /*
     * Returns a List of Files that are jpg extension in the current directory
     * This works if the default Working Directory isn't overridden
     *   Default in IntelliJ is the project folder (the one with .git)
     */
    static List<File> generateImageFileList(String dirPath = ".") {
        List<File> fileList = []
        File directory = new File(dirPath)
        if (directory.isDirectory()) {
            directory.eachFile(FileType.FILES) { File file ->
                if (file.path.split('/').last().toLowerCase() ==~ /.+(.jpg|.jpeg)/) {
                    fileList << file
                }
            }
        }
        return fileList
    }

    /*
     * Return a List of every image that has a Date Taken Exif tag, including the Date of the tag
     */
    static List<Map<String, Object>> generateImageListWithDateTaken(List<File> images) {
        List<Map<String, Object>> imagesToRename = []
        images.each { File image ->
            Metadata metadata = JpegMetadataReader.readMetadata(image)
            ExifSubIFDDirectory exif = metadata.getDirectory(ExifSubIFDDirectory)
            //exif will be null if this image doesn't have any Exif data (like a screenshot for example)
            Date dateTaken = exif?.getDate(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL)
            if (dateTaken) {
                imagesToRename << [filePath: image.path, dateTaken: dateTaken]
            }
        }
        return imagesToRename
    }

    /*
     * Takes a list of image files and renames them according to their date taken
     */
    static void renameImages(List<Map<String, Object>> imagesToRename) {
        imagesToRename.each { Map image ->
            String oldPath = image.filePath
            String pathWithoutFilename = oldPath.substring(0, oldPath.lastIndexOf('/')) // strip the filename from the path
            String newPath = "$pathWithoutFilename/${image.dateTaken.format('yyyy-MM-dd HH.mm.ss')}.jpg"

            //Skip if the script is trying to rename a file to itself
            if (oldPath == newPath) {
                println "Skipping $oldPath because it is already named correctly"
                return
            }

            if (!new File(newPath).exists()) {
                Files.move(Paths.get(oldPath), Paths.get(newPath))
                println "Renamed $oldPath to $newPath"
            } else {
                //TODO Conflicting file names are a bitch
                /*
                 * If there is a conflict for two dates (two images have same date taken down to the second)
                 *   then they will always conflict when being attempted to renamed. Currently I'm salting the file name
                 *   so that they are unique. This means they will always be renamed though, because each pass in the
                 *   future they will still be conflicting to the second with the proper name and then the new salt
                 *   will be different. Need to think of a solution where you can rename a file and have it be unique
                 *   but not waste resources by re-salting already-renamed files.
                 */
                String salt = Integer.toString(new Random().nextInt(100000))
                String saltedNewPath = "$pathWithoutFilename/${image.dateTaken.format('yyyy-MM-dd HH.mm.ss')}_${salt}.jpg"
                Files.move(Paths.get(oldPath), Paths.get(saltedNewPath))
                println "CONFLICT: $newPath already exists... will rename ${oldPath} to $saltedNewPath"
            }
            imagesRenamedCounter++
        }
    }
}
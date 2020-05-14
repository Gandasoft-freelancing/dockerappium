# DIGH_VEGA_IOS_Automation_Test_Framework

## Table of Contents

* [Introduction](#Introduction)
* [Prerequisites](#Prerequisites)
* [Installation](#Installation)
* [Usage](#Usage)
* [Troubleshooting](#Troubleshooting)

## Introduction

A nodejs automation testing framework to run Appium tests together with WebdriverIO for:
•	iOS/Android Native Apps
•	iOS/Android Hybrid Apps

## Prerequisites

This section details any and all prerequisites in order for the application to be run.

### Tools
Below tools/dependencies are required to be installed in the machine from where automation scripts would be triggered-
1.	Mac OSX 10.7+
2.	Appium - v1.9.0 and above
3.	Xcode 10+
4.	Xcode Command Line Tools
5.	Homebrew
6.	Node v10 and above
7.	Valid iOS Development Distribution Certificate and Provisioning Profiles (for real device only)
8.	VS Code 


## Installation

The installation section details steps that need to be taken in order to properly install the application.

1. Installation step 1

> npm install application-name -g

This global installation is required in order for the application to function properly.

2. Installation step 2

> npm install application-name --save

This command installs the application in a non-global manner.

For installation of tools refer this document


## Usage

•	Clone this repo

•	Open the framework in VS Code

•	Delete any “node_modules” folder that may be present

•	Open terminal and cd to the folder where repo is cloned

•	Run 'npm install' to install relevant dependencies from package.json. This will create a 'node_modules' folder within the framework structure 

•	Place the android apk or iOS .app/ipa files into the 'apps' folder within the framework

•	Update “mobilecaps.json” file with the device details

•	Start Appium on local machine

### Commands

#### Run Scripts on Local Devices

> npm run localtest-ios
This command is used to execute any script on local iOS devices

> npm run localtest-android
This command is used to execute any script on local android devices


#### Run Scripts on SauceLabs Remote Device Cloud
> npm run cloudtest
This command is used to execute any script on SauceLabs iOS/android devices

 
### Browsers and Devices
iOS tests to be executed on below devices –
-	iPhone 8
-	iPhone 8 Plus
-	iPhone X
-	iPhone XS Max
-	iPhone XS

HTML Reports get generated using default OS browser

## Troubleshooting

Commonly encountered errors and steps to resolve them –
•	Error while trying run a script on local iOS/android device
-	Ensure that the required device is plugged in to the machine via USB
-	Ensure that “deviceName”, “udid”, “platformVersion” are correctly updated in “mobilecaps.json”
-	Ensure that the .apk or .app files are available within the “apps” folder





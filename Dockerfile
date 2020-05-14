
FROM budtmo/docker-android-real-device 
WORKDIR /home/appium
COPY  Dependencies.sh  .
COPY  package.json .
RUN chmod a+x Dependencies.sh && ./Dependencies.sh
RUN apt install openjdk-11-jre -y
RUN apt install openjdk-11-jdk -y
ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64/bin"  PATH=$PATH:$JAVA_HOME
RUN npm install --save-dev cucumber
#RUN npm install
#RUN npm install -g grunt-cli


EXPOSE 4723
EXPOSE 5037
CMD ["appium"]
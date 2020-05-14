
FROM budtmo/docker-android-real-device 
WORKDIR /home/appium
COPY  Dependencies.sh  .
COPY  package.json .
COPY  project  .
COPY  install_apk.sh .
RUN chmod a+x Dependencies.sh && ./Dependencies.sh

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64/bin"  PATH=$PATH:$JAVA_HOME
RUN echo "###installing apk on all connected devices###"

RUN chmod a+x install_apk.sh  && ./install_apk.sh
EXPOSE 4723
EXPOSE 5037
CMD ["appium"]
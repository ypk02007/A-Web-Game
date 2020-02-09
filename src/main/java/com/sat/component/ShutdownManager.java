package com.sat.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class ShutdownManager{

    @Autowired
    private ApplicationContext appContext;

    public void initiateShutdown(){
    	System.out.println("Application stopped ... good bye");
        //SpringApplication.exit(appContext, () -> returnCode);
    	int exitCode = SpringApplication.exit(appContext);
    	System.exit(exitCode);
    }
}
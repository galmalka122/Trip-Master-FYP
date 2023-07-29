package dev.tripmaster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories("dev.tripmaster.repository")
@ComponentScan({"dev.tripmaster.model",
		"dev.tripmaster.repository",
		"dev.tripmaster.dto",
		"dev.tripmaster.auth",
		"dev.tripmaster.config",
		"dev.tripmaster.service",
		"dev.tripmaster.controller",})
public class TripMasterApplication {



	public static void main(String[] args) {
		SpringApplication.run(TripMasterApplication.class, args);
	}



}

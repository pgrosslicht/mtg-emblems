package com.grosslicht

import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder

@SpringBootApplication
open class MtgEmblemsApplication {
    @Bean
    open fun objectMapperBuilder(): Jackson2ObjectMapperBuilder
            = Jackson2ObjectMapperBuilder().modulesToInstall(KotlinModule())

    @Bean
    open fun init() = CommandLineRunner {

    }
}

fun main(args: Array<String>) {
    SpringApplication.run(MtgEmblemsApplication::class.java, *args)
}
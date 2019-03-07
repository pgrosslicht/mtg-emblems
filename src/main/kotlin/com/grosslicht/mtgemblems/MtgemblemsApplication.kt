package com.grosslicht.mtgemblems

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.reactive.config.EnableWebFlux

@SpringBootApplication
class MtgemblemsApplication

fun main(args: Array<String>) {
    runApplication<MtgemblemsApplication>(*args)
}

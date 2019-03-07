package com.grosslicht.mtgemblems.controllers

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.grosslicht.mtgemblems.dto.EmblemDto
import com.grosslicht.mtgemblems.entity.Emblem
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.redis.core.ReactiveRedisTemplate
import org.springframework.data.redis.listener.ChannelTopic
import org.springframework.data.redis.listener.ReactiveRedisMessageListenerContainer
import org.springframework.http.codec.ServerSentEvent
import org.springframework.web.bind.annotation.*
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.Duration

@RestController
class GameController(@Autowired val redisListener: ReactiveRedisMessageListenerContainer, @Autowired val redisTemplate: ReactiveRedisTemplate<String, String>) {

    private val mapper = jacksonObjectMapper()
    private val keyspacePrefix = "__keyspace@0__"
    private val rpushEvent = "rpush"

    @GetMapping("/put/{id}/{emblem}")
    fun putEmblem(@PathVariable id: String, @PathVariable emblem: String): Mono<ServerResponse> {
        return redisTemplate.opsForList().size(id)
                .map { EmblemDto(it + 1, emblem) }
                .flatMap { redisTemplate.opsForList().rightPush(id, mapper.writeValueAsString(it)) }
                .flatMap { redisTemplate.expire(id, Duration.ofDays(1)) }
                .flatMap { ServerResponse.noContent().build() }
    }

    @GetMapping("/game/{game}/play")
    fun playEmblem(@PathVariable game: String): Mono<ServerResponse> {
        return redisTemplate.opsForList().size(game)
                .map { EmblemDto(it + 1, "emblem") }
                .flatMap { redisTemplate.opsForList().rightPush(game, mapper.writeValueAsString(it)) }
                .flatMap { redisTemplate.expire(game, Duration.ofDays(1)) }
                .flatMap { ServerResponse.noContent().build() }
    }

    @CrossOrigin
    @GetMapping("/sse/{id}")
    fun sse(@PathVariable id: String, @RequestHeader("Last-Event-Id", defaultValue = "0") lastEventId: String): Flux<ServerSentEvent<String>> {
        val actualLastEventId = lastEventId.toLong()
        val pingFlux = Flux.interval(Duration.ofSeconds(10))
                .map { ServerSentEvent.builder(System.currentTimeMillis().toString()).event("ping").build() }
        val dataFlux = redisListener.receive(ChannelTopic("$keyspacePrefix:$id"))
                .doOnNext { println(it) }
                .filter { it.message == rpushEvent }
                .flatMap { redisTemplate.opsForList().range(id, -1, -1) }
                .map { Pair(mapper.readValue(it, EmblemDto::class.java).id, it) }
                .map { ServerSentEvent.builder(it.second).id("${it.first}").event("newElement").build() }
        val initialDataFlux = redisTemplate.opsForList().range(id, actualLastEventId, -1)
                .map { Pair(mapper.readValue(it, EmblemDto::class.java).id, it) }
                .map { ServerSentEvent.builder(it.second).id("${it.first}").event("newElement").build() }
        return Flux.concat(initialDataFlux, Flux.merge(dataFlux, pingFlux))
    }
}
package com.grosslicht.mtgemblems

import org.springframework.boot.autoconfigure.h2.H2ConsoleAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory
import org.springframework.data.redis.core.ReactiveRedisTemplate
import org.springframework.data.redis.listener.ReactiveRedisMessageListenerContainer
import org.springframework.data.redis.serializer.RedisSerializationContext


@Configuration
@Import(H2ConsoleAutoConfiguration::class)
class RedisConfiguration {
    @Bean
    fun reactiveRedisTemplate(factory: ReactiveRedisConnectionFactory): ReactiveRedisTemplate<String, String> {
        return ReactiveRedisTemplate(factory, RedisSerializationContext.string())
    }

    @Bean
    fun container(factory: ReactiveRedisConnectionFactory): ReactiveRedisMessageListenerContainer {
        return ReactiveRedisMessageListenerContainer(factory)
    }
}

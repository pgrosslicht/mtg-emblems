package com.grosslicht.mtgemblems.repository

import com.grosslicht.mtgemblems.entity.Emblem
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import java.util.*

interface EmblemRepository : ReactiveCrudRepository<Emblem, UUID>

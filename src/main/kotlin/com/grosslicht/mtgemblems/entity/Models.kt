package com.grosslicht.mtgemblems.entity

import org.hibernate.envers.Audited
import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
@Audited
data class Emblem(@Id @GeneratedValue val id: UUID = UUID.randomUUID(),
                  val emblem: String)


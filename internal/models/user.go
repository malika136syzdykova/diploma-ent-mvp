package models

import "time"

type User struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Name         string    `gorm:"not null" json:"name"`
	Email        string    `gorm:"not null;uniqueIndex" json:"email"`
	PasswordHash string    `gorm:"not null" json:"-"`
	Avatar       string    `json:"avatar"`
	TargetScore  int       `json:"target_score"`
	CreatedAt    time.Time `json:"created_at"`
}

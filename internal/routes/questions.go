package routes

import (
	"diploma-ent-mvp/internal/handlers"

	"github.com/gin-gonic/gin"
)

func SetupQuestionsRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/questions", handlers.GetRandomQuestion)
		api.POST("/answer", handlers.SubmitAnswer)
		api.GET("/progress/:user_id", handlers.GetProgress)
		api.GET("/prediction/:user_id", handlers.GetPrediction)
		api.POST("/auth/register", handlers.Register)
		api.POST("/auth/login", handlers.Login)
		api.GET("/users/:id", handlers.GetUserProfile)
		api.PUT("/users/:id/profile", handlers.UpdateUserProfile)
	}
}

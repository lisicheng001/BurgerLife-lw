"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const generateOrder = () => {
  return ["lettuce", "tomato", "cheese", "patty", "top-bun"]
}

export default function BurgerLifePage() {
  const [showFloatingElements, setShowFloatingElements] = useState(false)
  const [showGameOverlay, setShowGameOverlay] = useState(false)
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [gameLoading, setGameLoading] = useState(false)
  const [gameError, setGameError] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [burgerStack, setBurgerStack] = useState<string[]>(["bottom-bun"])
  const [availableIngredients] = useState(["lettuce", "tomato", "cheese", "patty", "top-bun"])
  const [currentOrder, setCurrentOrder] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(60)
  const [combo, setCombo] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])
  const [level, setLevel] = useState(1)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showComboEffect, setShowComboEffect] = useState(false)
  const [totalBurgers, setTotalBurgers] = useState(0)
  const [perfectBurgers, setPerfectBurgers] = useState(0)
  const [showAchievement, setShowAchievement] = useState<string | null>(null)

  const games = [
    {
      id: "burgerlife",
      title: "BurgerLife",
      description: "Cook delicious burgers and build your restaurant empire!",
      emoji: "🍔",
      type: "custom",
      available: true,
      coverImage: "/burger-cooking-game-colorful-chef-hat-ingredients.jpg",
    },
    {
      id: "highway-traffic",
      title: "Highway Traffic",
      description: "Navigate through traffic and reach your destination!",
      emoji: "🚗",
      type: "iframe",
      url: "https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html",
      available: true,
      coverImage: "/highway-traffic-cars-racing-road-game.jpg",
    },
    {
      id: "domino-multiplayer",
      title: "Domino Multiplayer",
      description: "Play classic domino games with friends online!",
      emoji: "🎯",
      type: "iframe",
      url: "https://html5.gamedistribution.com/7fd4b7da7318410dbb9ba8b85a3d1b22/",
      available: true,
      coverImage: "/domino-tiles-game-multiplayer-colorful.jpg",
    },
    {
      id: "merge-numbers",
      title: "Merge Numbers",
      description: "Combine numbers to create bigger ones in this addictive puzzle!",
      emoji: "🔢",
      type: "iframe",
      url: "https://html5.gamedistribution.com/cb6bc654fd2344d785be7d6b87f7b253/",
      available: true,
      coverImage: "/number-puzzle-merge-game-colorful-blocks.jpg",
    },
    {
      id: "truck-simulator",
      title: "Simulator Truck Driver",
      description: "Drive massive trucks and deliver cargo across the country!",
      emoji: "🚛",
      type: "iframe",
      url: "https://html5.gamedistribution.com/09a193f0c44944a982e01da73e9f1131/",
      available: true,
      coverImage: "/truck-simulator-driving-game-big-truck-road.jpg",
    },
    {
      id: "squid-glass-bridge",
      title: "Squid 2: Glass Bridge",
      description: "Cross the dangerous glass bridge in this thrilling challenge!",
      emoji: "🌉",
      type: "iframe",
      url: "https://html5.gamedistribution.com/474585251d1a4802bc0febcc438aa31d/",
      available: true,
      coverImage: "/glass-bridge-game-squid-challenge-colorful.jpg",
    },
    {
      id: "mobile-legends-slime",
      title: "Mobile Legends Slime 3v3",
      description: "Battle with slimes in this exciting 3v3 arena game!",
      emoji: "🎮",
      type: "iframe",
      url: "https://html5.gamedistribution.com/f4d128de33f14bea95d3fe2382270bb4/",
      available: true,
      coverImage: "/slime-battle-arena-game-colorful-characters.jpg",
    },
    {
      id: "pizza-maker",
      title: "Pizza Maker",
      description: "Create delicious pizzas with your favorite toppings!",
      emoji: "🍕",
      type: "custom",
      available: true,
      coverImage: "/pizza-making-game-colorful-toppings-chef.jpg",
    },
    {
      id: "memory-match",
      title: "Memory Match",
      description: "Test your memory with this fun card matching game!",
      emoji: "🧠",
      type: "custom",
      available: true,
      coverImage: "/memory-card-matching-game-colorful-cards-brain.jpg",
    },
    {
      id: "color-clicker",
      title: "Color Clicker",
      description: "Click the right colors as fast as you can!",
      emoji: "🌈",
      type: "custom",
      available: true,
      coverImage: "/color-clicking-game-rainbow-colorful-buttons.jpg",
    },
    {
      id: "number-jump",
      title: "Number Jump",
      description: "Jump on the right numbers to score points!",
      emoji: "🔢",
      type: "custom",
      available: true,
      coverImage: "/number-jumping-game-colorful-numbers-platform.jpg",
    },
  ]

  useEffect(() => {
    setShowFloatingElements(true)
  }, [])

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameStarted(false)
      checkAchievements()
    }
  }, [gameStarted, timeLeft])

  const checkAchievements = () => {
    const newAchievements = []

    if (totalBurgers >= 5 && !achievements.includes("First Chef")) {
      newAchievements.push("First Chef")
      showAchievementPopup("🏆 First Chef - Made 5 burgers!")
    }
    if (perfectBurgers >= 3 && !achievements.includes("Perfect Cook")) {
      newAchievements.push("Perfect Cook")
      showAchievementPopup("⭐ Perfect Cook - 3 perfect burgers!")
    }
    if (combo >= 3 && !achievements.includes("Combo Master")) {
      newAchievements.push("Combo Master")
      showAchievementPopup("🔥 Combo Master - 3x combo!")
    }
    if (score >= 500 && !achievements.includes("Score Hero")) {
      newAchievements.push("Score Hero")
      showAchievementPopup("💎 Score Hero - 500+ points!")
    }

    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements])
    }
  }

  const showAchievementPopup = (message: string) => {
    setShowAchievement(message)
    setTimeout(() => setShowAchievement(null), 3000)
  }

  const startGame = (gameId: string) => {
    const game = games.find((g) => g.id === gameId)
    if (game && game.available) {
      setCurrentGame(gameId)
      setShowGameOverlay(true)
      setGameLoading(false)
      setGameError(false)
    }
  }

  const closeGame = () => {
    setShowGameOverlay(false)
    setGameStarted(false)
    setCurrentGame(null)
  }

  const playSuccessEffect = () => {
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 1000)
  }

  const playComboEffect = () => {
    setShowComboEffect(true)
    setTimeout(() => setShowComboEffect(false), 800)
  }

  const addIngredient = (ingredient: string) => {
    if (!gameStarted) return
    setBurgerStack([...burgerStack, ingredient])

    if (ingredient === "top-bun") {
      const orderIngredients = burgerStack.slice(1)
      const matches = currentOrder.every((item) => orderIngredients.includes(item))
      const perfectMatch = matches && orderIngredients.length === currentOrder.length + 1

      setTotalBurgers(totalBurgers + 1)

      if (perfectMatch) {
        const baseScore = 100
        const comboBonus = combo * 25
        const levelBonus = level * 10
        const totalPoints = baseScore + comboBonus + levelBonus

        setScore(score + totalPoints)
        setCombo(combo + 1)
        setPerfectBurgers(perfectBurgers + 1)

        playSuccessEffect()
        if (combo >= 2) playComboEffect()

        if (totalBurgers > 0 && totalBurgers % 5 === 0) {
          setLevel(Math.min(5, level + 1))
        }

        setBurgerStack(["bottom-bun"])
        setCurrentOrder(generateOrder())
        checkAchievements()
      } else {
        setScore(Math.max(0, score - 25))
        setCombo(0)
        setBurgerStack(["bottom-bun"])
        setCurrentOrder(generateOrder())
      }
    }
  }

  const getIngredientEmoji = (ingredient: string) => {
    const emojis: { [key: string]: string } = {
      "bottom-bun": "🟤",
      lettuce: "🥬",
      tomato: "🍅",
      cheese: "🧀",
      patty: "🥩",
      "top-bun": "🟫",
    }
    return emojis[ingredient] || "❓"
  }

  if (showGameOverlay) {
    const game = games.find((g) => g.id === currentGame)

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400 z-50 flex flex-col">
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 text-white py-3 px-6 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{game?.emoji}</div>
            <span className="text-xl font-bold">{game?.title}</span>
          </div>
          <Button
            onClick={closeGame}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-full text-sm font-medium"
          >
            ← Back to Home
          </Button>
        </div>

        <div className="flex-1 p-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-white mb-2">
                {game?.emoji} {game?.title}
              </h2>
              <p className="text-white/80">{game?.description}</p>
            </div>

            <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-2xl">
              {currentGame === "burgerlife" && (
                <div className="w-full h-full p-8 bg-gradient-to-br from-orange-100 to-yellow-100">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-orange-800">🍔 BurgerLife Cooking Game</h3>
                    <p className="text-lg text-gray-700 mb-6">Stack ingredients to create perfect burgers!</p>
                    <Button
                      onClick={() => {
                        setGameStarted(true)
                        setCurrentOrder(generateOrder())
                        setTimeLeft(60)
                        setScore(0)
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-xl font-bold rounded-full"
                    >
                      🚀 Start Cooking!
                    </Button>
                  </div>
                </div>
              )}

              {currentGame === "pizza-maker" && (
                <div className="w-full h-full p-8 bg-gradient-to-br from-red-100 to-yellow-100">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-red-800">🍕 Pizza Maker</h3>
                    <p className="text-lg text-gray-700 mb-6">Create amazing pizzas with your favorite toppings!</p>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                      {["🍅", "🧀", "🍄", "🥓", "🌶️", "🫒"].map((topping, index) => (
                        <Button
                          key={index}
                          className="text-4xl p-4 bg-white hover:bg-yellow-100 border-2 border-red-300 rounded-xl"
                          onClick={() => setScore(score + 10)}
                        >
                          {topping}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xl font-bold text-red-600">Score: {score} 🏆</p>
                  </div>
                </div>
              )}

              {currentGame === "memory-match" && (
                <div className="w-full h-full p-8 bg-gradient-to-br from-blue-100 to-purple-100">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-blue-800">🧠 Memory Match</h3>
                    <p className="text-lg text-gray-700 mb-6">Find matching pairs of emojis!</p>
                    <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-6">
                      {["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"].map((emoji, index) => (
                        <Button
                          key={index}
                          className="text-3xl p-3 bg-white hover:bg-blue-100 border-2 border-blue-300 rounded-xl"
                          onClick={() => setScore(score + 5)}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xl font-bold text-blue-600">Score: {score} 🏆</p>
                  </div>
                </div>
              )}

              {currentGame === "color-clicker" && (
                <div className="w-full h-full p-8 bg-gradient-to-br from-green-100 to-teal-100">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-green-800">🌈 Color Clicker</h3>
                    <p className="text-lg text-gray-700 mb-6">Click the colors as fast as you can!</p>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                      {["🔴", "🟡", "🟢", "🔵", "🟣", "🟠"].map((color, index) => (
                        <Button
                          key={index}
                          className="text-6xl p-6 bg-white hover:bg-green-100 border-2 border-green-300 rounded-xl transform hover:scale-110 transition-all duration-200"
                          onClick={() => setScore(score + 1)}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xl font-bold text-green-600">Score: {score} 🏆</p>
                  </div>
                </div>
              )}

              {currentGame === "number-jump" && (
                <div className="w-full h-full p-8 bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-purple-800">🔢 Number Jump</h3>
                    <p className="text-lg text-gray-700 mb-6">Jump on the right numbers to score!</p>
                    <div className="grid grid-cols-5 gap-3 max-w-lg mx-auto mb-6">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number, index) => (
                        <Button
                          key={index}
                          className="text-2xl p-4 bg-white hover:bg-purple-100 border-2 border-purple-300 rounded-xl font-bold transform hover:scale-110 transition-all duration-200"
                          onClick={() => setScore(score + number)}
                        >
                          {number}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xl font-bold text-purple-600">Score: {score} 🏆</p>
                  </div>
                </div>
              )}

              {currentGame === "highway-traffic" && (
                <iframe
                  src="https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html"
                  title="Highway Traffic"
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}

              {currentGame === "domino-multiplayer" && (
                <iframe
                  src="https://html5.gamedistribution.com/7fd4b7da7318410dbb9ba8b85a3d1b22/"
                  title="Domino Multiplayer"
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}

              {currentGame === "merge-numbers" && (
                <iframe
                  src="https://html5.gamedistribution.com/cb6bc654fd2344d785be7d6b87f7b253/"
                  title="Merge Numbers"
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}

              {currentGame === "truck-simulator" && (
                <iframe
                  src="https://html5.gamedistribution.com/09a193f0c44944a982e01da73e9f1131/"
                  title="Simulator Truck Driver"
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}

              {currentGame === "squid-glass-bridge" && (
                <iframe
                  src="https://html5.gamedistribution.com/474585251d1a4802bc0febcc438aa31d/"
                  title="Squid 2: Glass Bridge"
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}

              {currentGame === "mobile-legends-slime" && (
                <iframe
                  src="https://html5.gamedistribution.com/f4d128de33f14bea95d3fe2382270bb4/"
                  title="Mobile Legends Slime 3v3"
                  loading="lazy"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white py-2 px-6 text-center">
          <span className="text-sm">
            🎮 Playing {game?.title} on BurgerLife.online • Your Ultimate Gaming Destination
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 relative overflow-hidden">
      {showFloatingElements && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-10 text-4xl float-animation opacity-20 text-orange-600">🍔</div>
          <div
            className="absolute top-40 right-20 text-3xl float-animation opacity-20 text-yellow-600"
            style={{ animationDelay: "1s" }}
          >
            🍟
          </div>
          <div
            className="absolute top-60 left-1/4 text-2xl float-animation opacity-20 text-blue-600"
            style={{ animationDelay: "2s" }}
          >
            🥤
          </div>
          <div
            className="absolute bottom-40 right-10 text-4xl float-animation opacity-20 text-yellow-600"
            style={{ animationDelay: "0.5s" }}
          >
            🧀
          </div>
          <div
            className="absolute bottom-60 left-20 text-3xl float-animation opacity-20 text-green-600"
            style={{ animationDelay: "1.5s" }}
          >
            🥬
          </div>
          <div
            className="absolute top-1/3 right-1/3 text-2xl float-animation opacity-20 text-red-600"
            style={{ animationDelay: "2.5s" }}
          >
            🍅
          </div>
        </div>
      )}

      <header className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white py-6 px-6 shadow-2xl relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl wiggle-animation" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
              🍔
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text bg-white bg-clip-text text-transparent">
              BurgerLife
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm border border-white/20">
            <span className="text-2xl bounce-in" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}>
              🎮
            </span>
            <span className="font-semibold text-white" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}>
              Free Online Game
            </span>
          </div>
        </div>
      </header>

      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <div className="text-8xl mb-6 wiggle-animation relative sparkle">🎮</div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 gradient-text bounce-in">Welcome to BurgerLife!</h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
              🌟 Your ultimate gaming destination! Play amazing games, have fun, and challenge yourself! 🌟
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-10 gradient-text">🎯 Choose Your Game</h3>
            <div className="max-w-7xl mx-auto">
              {/* Featured Games Row */}
              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Large Featured Game */}
                <Card
                  key={games[0].id}
                  className="lg:w-2/3 p-8 bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400 border-0 hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:rotate-1 cursor-pointer relative overflow-hidden"
                  onClick={() => startGame(games[0].id)}
                >
                  <div className="absolute top-0 right-0 bg-yellow-300 text-orange-800 px-4 py-2 rounded-bl-2xl font-bold text-sm">
                    ⭐ FEATURED
                  </div>
                  <div className="text-white">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden">
                      <img
                        src={games[0].coverImage || "/placeholder.svg"}
                        alt={games[0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-3xl font-bold mb-3">{games[0].title}</h4>
                    <p className="text-xl mb-6 opacity-90">{games[0].description}</p>
                    <Button className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-full text-lg transform hover:scale-110 transition-all duration-300">
                      🚀 Play Featured Game!
                    </Button>
                  </div>
                </Card>

                {/* Side Games */}
                <div className="lg:w-1/3 space-y-6">
                  {games.slice(1, 3).map((game, index) => (
                    <Card
                      key={game.id}
                      className={`p-6 bg-gradient-to-br ${
                        index === 0 ? "from-blue-800 to-purple-900" : "from-green-800 to-teal-900"
                      } border-0 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 cursor-pointer text-white`}
                      onClick={() => startGame(game.id)}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="w-16 h-16 mb-3 rounded-xl bg-white/20 backdrop-blur-sm overflow-hidden">
                        <img
                          src={game.coverImage || "/placeholder.svg"}
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-white">{game.title}</h4>
                      <p className="text-sm mb-4 text-white/90">{game.description}</p>
                      <Button className="w-full bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900 font-bold py-2 rounded-full transform hover:scale-105 transition-all duration-300">
                        Play Now!
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Dynamic Grid for Remaining Games */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {games.slice(3).map((game, index) => (
                  <Card
                    key={game.id}
                    className={`p-6 transition-all duration-500 transform hover:scale-105 ${
                      index % 2 === 0 ? "hover:rotate-2" : "hover:-rotate-2"
                    } ${
                      game.available
                        ? `${
                            index % 4 === 0
                              ? "bg-pink-900"
                              : index % 4 === 1
                                ? "bg-cyan-900"
                                : index % 4 === 2
                                  ? "bg-emerald-900"
                                  : "bg-violet-900"
                          } border-0 hover:shadow-xl cursor-pointer text-white`
                        : "bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed border-gray-400 opacity-70"
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transform: `translateY(${index % 2 === 0 ? "10px" : "-10px"})`,
                      backgroundColor: game.available
                        ? index % 4 === 0
                          ? "#7c2d12"
                          : // brown-900
                            index % 4 === 1
                            ? "#164e63"
                            : // cyan-900
                              index % 4 === 2
                              ? "#064e3b"
                              : // emerald-900
                                "#581c87" // violet-900
                        : undefined,
                    }}
                    onClick={() => game.available && startGame(game.id)}
                  >
                    <div className="relative">
                      <div
                        className={`w-full h-32 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden ${
                          game.available ? "bg-white/20 backdrop-blur-sm" : "bg-gray-100"
                        }`}
                      >
                        {game.available ? (
                          <img
                            src={game.coverImage || "/placeholder.svg"}
                            alt={game.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`text-6xl ${game.available ? "wiggle-animation" : ""}`}>{game.emoji}</div>
                        )}
                        {!game.available && (
                          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full font-bold text-xs">
                              Coming Soon
                            </span>
                          </div>
                        )}
                      </div>

                      <h4
                        className={`text-lg font-bold mb-2 ${game.available ? "text-white" : "text-gray-600"}`}
                        style={{ color: game.available ? "#ffffff" : undefined }}
                      >
                        {game.title}
                      </h4>
                      <p
                        className={`text-sm mb-4 leading-relaxed ${game.available ? "text-white/90" : "text-gray-500"}`}
                        style={{ color: game.available ? "rgba(255, 255, 255, 0.9)" : undefined }}
                      >
                        {game.description}
                      </p>

                      {game.available ? (
                        <Button className="w-full bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900 font-bold py-2 rounded-full transform hover:scale-105 transition-all duration-300">
                          🎮 Play!
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="w-full bg-gray-400 text-gray-600 font-bold py-2 rounded-full cursor-not-allowed"
                        >
                          Coming Soon...
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-400 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Comments Header */}
          <div className="text-center mb-12 bg-white/95 rounded-3xl p-8 border-8 border-yellow-300 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
              🌟🎉 WHAT KIDS ARE SAYING! 🎉🌟
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
              💬 AMAZING REVIEWS FROM HAPPY KIDS! 💬
            </p>
            <div className="text-4xl">⭐⭐⭐⭐⭐</div>
          </div>

          {/* Comments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "Emma, age 8",
                emoji: "😊",
                text: "OMG! BurgerLife is the BEST game ever! I made 50 burgers and my restaurant is super cool! 🍔✨",
                stars: "⭐⭐⭐⭐⭐",
              },
              {
                name: "Jake, age 10",
                emoji: "🤩",
                text: "I play every day after school! The truck game is AWESOME and I beat all my friends! 🚛💨",
                stars: "⭐⭐⭐⭐⭐",
              },
              {
                name: "Sophia, age 7",
                emoji: "🥳",
                text: "So much fun! I love making burgers with cheese and tomatoes! My mom plays with me too! 🧀🍅",
                stars: "⭐⭐⭐⭐⭐",
              },
              {
                name: "Alex, age 9",
                emoji: "😎",
                text: "Highway Traffic is SO COOL! I'm like a race car driver! Zoom zoom! 🏎️💨",
                stars: "⭐⭐⭐⭐⭐",
              },
              {
                name: "Mia, age 6",
                emoji: "🤗",
                text: "I love all the colors and sounds! The games make me happy! Can I play forever? 🌈🎵",
                stars: "⭐⭐⭐⭐⭐",
              },
              {
                name: "Lucas, age 11",
                emoji: "🚀",
                text: "Best website EVER! I told all my friends at school! We play together online! 🎮👫",
                stars: "⭐⭐⭐⭐⭐",
              },
            ].map((comment, index) => (
              <Card
                key={index}
                className="p-8 bg-white/98 border-4 border-yellow-300 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 shadow-xl"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3 bounce-in">{comment.emoji}</div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-orange-600 text-lg">{comment.name}</span>
                    <div className="text-lg">{comment.stars}</div>
                  </div>
                  <p className="text-gray-800 font-medium leading-relaxed">{comment.text}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Add Comment Form */}
          <Card className="p-8 bg-white/95 border-4 border-green-400 shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6 text-green-600">🎉 Tell us what you think! 🎉</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name and age (like Emma, age 8)"
                className="w-full p-4 border-3 border-yellow-300 rounded-xl font-bold text-lg focus:border-orange-400 focus:outline-none transition-all duration-300"
              />
              <textarea
                placeholder="Tell us how much you LOVE these games! 😍"
                rows={4}
                className="w-full p-4 border-3 border-yellow-300 rounded-xl font-bold text-lg focus:border-orange-400 focus:outline-none transition-all duration-300 resize-none"
              />
              <Button
                onClick={() => {
                  // Simple celebration effect
                  alert("🎉 Thank you for your awesome review! 🎉")
                }}
                className="w-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 hover:from-green-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl text-xl transform hover:scale-105 transition-all duration-300"
              >
                🌟 Share My Review! 🌟
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white py-12 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-3xl float-animation">🍔</div>
            <h3 className="text-2xl font-bold">BurgerLife.online</h3>
            <div className="text-3xl float-animation" style={{ animationDelay: "1s" }}>
              🍔
            </div>
          </div>
          <p className="text-lg opacity-90 mb-6 leading-relaxed">
            The ultimate burger cooking game experience. Create, serve, and build your restaurant empire! 🚀✨
          </p>
          <p className="text-sm opacity-70">
            © 2024 BurgerLife.online - All rights reserved. Play responsibly and have fun! 🎮❤️
          </p>
        </div>
      </footer>
    </div>
  )
}

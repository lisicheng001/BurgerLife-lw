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
    },
    {
      id: "highway-traffic",
      title: "Highway Traffic",
      description: "Navigate through traffic and reach your destination!",
      emoji: "🚗",
      type: "iframe",
      url: "https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html",
      available: true,
    },
    {
      id: "domino-multiplayer",
      title: "Domino Multiplayer",
      description: "Play classic domino games with friends online!",
      emoji: "🎯",
      type: "iframe",
      url: "https://html5.gamedistribution.com/7fd4b7da7318410dbb9ba8b85a3d1b22/",
      available: true,
    },
    {
      id: "merge-numbers",
      title: "Merge Numbers",
      description: "Combine numbers to create bigger ones in this addictive puzzle!",
      emoji: "🔢",
      type: "iframe",
      url: "https://html5.gamedistribution.com/cb6bc654fd2344d785be7d6b87f7b253/",
      available: true,
    },
    {
      id: "truck-simulator",
      title: "Simulator Truck Driver",
      description: "Drive massive trucks and deliver cargo across the country!",
      emoji: "🚛",
      type: "iframe",
      url: "https://html5.gamedistribution.com/09a193f0c44944a982e01da73e9f1131/",
      available: true,
    },
    {
      id: "squid-glass-bridge",
      title: "Squid 2: Glass Bridge",
      description: "Cross the dangerous glass bridge in this thrilling challenge!",
      emoji: "🌉",
      type: "iframe",
      url: "https://html5.gamedistribution.com/474585251d1a4802bc0febcc438aa31d/",
      available: true,
    },
    {
      id: "mobile-legends-slime",
      title: "Mobile Legends Slime 3v3",
      description: "Battle with slimes in this exciting 3v3 arena game!",
      emoji: "🎮",
      type: "iframe",
      url: "https://html5.gamedistribution.com/f4d128de33f14bea95d3fe2382270bb4/",
      available: true,
    },
    {
      id: "game4",
      title: "Coming Soon",
      description: "Amazing adventure awaits!",
      emoji: "🎯",
      type: "placeholder",
      available: false,
    },
    {
      id: "game5",
      title: "Coming Soon",
      description: "Fun puzzle game in development!",
      emoji: "🧩",
      type: "placeholder",
      available: false,
    },
    {
      id: "game6",
      title: "Coming Soon",
      description: "Action-packed game coming soon!",
      emoji: "⚡",
      type: "placeholder",
      available: false,
    },
    {
      id: "game7",
      title: "Coming Soon",
      description: "Mystery game in the works!",
      emoji: "🌟",
      type: "placeholder",
      available: false,
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
          <div className="absolute top-20 left-10 text-4xl float-animation opacity-20">🍔</div>
          <div
            className="absolute top-40 right-20 text-3xl float-animation opacity-20"
            style={{ animationDelay: "1s" }}
          >
            🍟
          </div>
          <div
            className="absolute top-60 left-1/4 text-2xl float-animation opacity-20"
            style={{ animationDelay: "2s" }}
          >
            🥤
          </div>
          <div
            className="absolute bottom-40 right-10 text-4xl float-animation opacity-20"
            style={{ animationDelay: "0.5s" }}
          >
            🧀
          </div>
          <div
            className="absolute bottom-60 left-20 text-3xl float-animation opacity-20"
            style={{ animationDelay: "1.5s" }}
          >
            🥬
          </div>
          <div className="absolute top-1/3 right-1/3 text-2xl float-animation" style={{ animationDelay: "2.5s" }}>
            🍅
          </div>
        </div>
      )}

      <header className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white py-6 px-6 shadow-2xl relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl wiggle-animation">🍔</div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text bg-white bg-clip-text text-transparent">
              BurgerLife
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
            <span className="text-2xl bounce-in">🎮</span>
            <span className="font-semibold">Free Online Game</span>
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
                    <div className="w-32 h-32 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-6xl">
                      🍔
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
                        index === 0 ? "from-blue-400 to-purple-500" : "from-green-400 to-teal-500"
                      } border-0 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 cursor-pointer text-white`}
                      onClick={() => startGame(game.id)}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="w-16 h-16 mb-3 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
                        {game.emoji}
                      </div>
                      <h4 className="text-xl font-bold mb-2">{game.title}</h4>
                      <p className="text-sm opacity-90 mb-4">{game.description}</p>
                      <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 font-bold py-2 rounded-full">
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
                        ? `bg-gradient-to-br ${
                            index % 4 === 0
                              ? "from-pink-300 to-rose-400"
                              : index % 4 === 1
                                ? "from-cyan-300 to-blue-400"
                                : index % 4 === 2
                                  ? "from-emerald-300 to-green-400"
                                  : "from-violet-300 to-purple-400"
                          } border-0 hover:shadow-xl cursor-pointer text-white`
                        : "bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed border-gray-400 opacity-70"
                    }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transform: `translateY(${index % 2 === 0 ? "10px" : "-10px"})`,
                    }}
                    onClick={() => game.available && startGame(game.id)}
                  >
                    <div className="relative">
                      <div
                        className={`w-full h-32 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden ${
                          game.available ? "bg-white/20 backdrop-blur-sm" : "bg-gray-100"
                        }`}
                      >
                        <div className={`text-6xl ${game.available ? "wiggle-animation" : ""}`}>{game.emoji}</div>
                        {!game.available && (
                          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full font-bold text-xs">
                              Coming Soon
                            </span>
                          </div>
                        )}
                      </div>

                      <h4 className={`text-lg font-bold mb-2 ${game.available ? "text-white" : "text-gray-600"}`}>
                        {game.title}
                      </h4>
                      <p
                        className={`text-sm mb-4 leading-relaxed ${game.available ? "text-white/90" : "text-gray-500"}`}
                      >
                        {game.description}
                      </p>

                      {game.available ? (
                        <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 font-bold py-2 rounded-full transform hover:scale-105 transition-all duration-300">
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

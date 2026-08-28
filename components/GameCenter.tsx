import { ThemedText } from '@/components/themed-text';
import { Themes, useTheme } from '@/src/context/ThemeContext';
import { getAvatarSource, useUser } from '@/src/context/UserContext';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, Image, Modal, PanResponder, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

// --- Types ---
type GameType = 'menu' | 'batting' | 'struckout' | 'darts' | 'bowling' | 'shogi' | 'chess' | 'go';

// --- Assets (Placeholders) ---
// In a real app, we'd have images. We'll use text/emojis for now.

// =====================================================================
// SPORTS GAMES
// =====================================================================

// --- 1. Batting Center (Power Pros Style) ---
const BattingGame = ({ onExit }: { onExit: () => void }) => {
    const { theme } = useTheme();
    const colors = Themes[theme];
    const { avatarId } = useUser();

    // Game State
    const [gameState, setGameState] = useState<'ready' | 'pitching' | 'hit' | 'miss'>('ready');
    const [score, setScore] = useState(0);
    const [resultMsg, setResultMsg] = useState<string | null>(null);

    // Physics / Positions
    // Zone is roughly 200x200. Center is (0,0) relative to Zone center?
    // Let's use absolute within the container. 
    // Container: 300w x 400h. Zone: 200w x 250h.
    const ZONE_W = 200;
    const ZONE_H = 200;

    // Cursor
    const cursorPan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    // Ball (Animated Value for X/Y/Scale)
    const ballAnim = useRef(new Animated.ValueXY({ x: 0, y: -400 })).current; // Start far away (top)
    const ballScale = useRef(new Animated.Value(0.1)).current; // Start small

    // Swing
    const swingAnim = useRef(new Animated.Value(0)).current;

    // Logic Vars
    const targetRef = useRef({ x: 0, y: 0 }); // Where the pitch is going
    const cursorRef = useRef({ x: 0, y: 0 }); // Current cursor pos

    // Cursor PanResponder
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                cursorPan.setOffset({
                    x: (cursorPan.x as any)._value,
                    y: (cursorPan.y as any)._value
                });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: cursorPan.x, dy: cursorPan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                cursorPan.flattenOffset();
            }
        })
    ).current;

    // Track cursor value
    useEffect(() => {
        const id = cursorPan.addListener((val) => {
            cursorRef.current = val;
        });
        return () => cursorPan.removeListener(id);
    }, []);

    const startPitch = () => {
        setGameState('pitching');
        setResultMsg(null);

        // Reset Ball
        ballAnim.setValue({ x: 0, y: -400 }); // Pitcher mound area
        ballScale.setValue(0.1);
        swingAnim.setValue(0);

        // Pick Target (-100 to 100)
        const tx = (Math.random() - 0.5) * (ZONE_W * 0.8);
        const ty = (Math.random() - 0.5) * (ZONE_H * 0.8);
        targetRef.current = { x: tx, y: ty };

        // Animate Pitch
        Animated.parallel([
            Animated.timing(ballAnim, {
                toValue: { x: tx, y: ty },
                duration: 2000, // 2 seconds to reach plate
                easing: Easing.quad,
                useNativeDriver: false, // Layout props
            }),
            Animated.timing(ballScale, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ]).start(({ finished }) => {
            if (finished && gameState !== 'hit') {
                setGameState('ready'); // Missed (watcher)
                setResultMsg("BALL");
            }
        });
    };

    const swing = () => {
        if (gameState !== 'pitching') return;

        // Visual Swing
        Animated.sequence([
            Animated.timing(swingAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
            Animated.timing(swingAnim, { toValue: 0, duration: 300, delay: 200, useNativeDriver: true })
        ]).start();

        // Check Collision
        // Ball must be 'close enough' in Z (scale approx 0.8-1.0) AND X/Y
        const scaleVal = (ballScale as any)._value; // Hacky but fast
        const ballX = (ballAnim.x as any)._value;
        const ballY = (ballAnim.y as any)._value;
        const curX = cursorRef.current.x;
        const curY = cursorRef.current.y;

        // Timing Check (Scale > 0.8 means it's near the plate)
        if (scaleVal > 0.85 && scaleVal < 1.05) {
            // Distance Check
            const dist = Math.sqrt(Math.pow(ballX - curX, 2) + Math.pow(ballY - curY, 2));

            // Meet Cursor Radius is about 30?
            if (dist < 40) {
                // HIT!
                ballAnim.stopAnimation();
                ballScale.stopAnimation();
                setGameState('hit');

                const isPerfect = dist < 15;
                setScore(s => s + (isPerfect ? 1000 : 300));
                setResultMsg(isPerfect ? "HOMERUN!! 🌈" : "HIT! ⚾");

                // Fly away animation
                Animated.parallel([
                    Animated.timing(ballAnim, {
                        toValue: { x: (Math.random() - 0.5) * 1000, y: -1000 },
                        duration: 800,
                        useNativeDriver: false
                    }),
                    Animated.timing(ballScale, { toValue: 0.1, duration: 800, useNativeDriver: false })
                ]).start();

            } else {
                setResultMsg("MISS! (Cursor)");
            }
        } else {
            setResultMsg("MISS! (Timing)");
        }
    };

    // Body Animation
    const bodyRotate = swingAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-45deg'] });
    const batRotate = swingAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-120deg'] });

    return (
        <View style={styles.gameContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 }}>
                <ThemedText type="subtitle">⚾ Power Batting</ThemedText>
                <ThemedText type="subtitle">Score: {score}</ThemedText>
            </View>

            {/* The Stadium/Field */}
            <View style={{
                width: 340, height: 400, backgroundColor: '#4ade80', // Green Field
                borderRadius: 20, overflow: 'hidden', marginVertical: 10,
                alignItems: 'center', justifyContent: 'center',
                borderWidth: 2, borderColor: '#fff'
            }}>
                {/* Mound */}
                <View style={{ position: 'absolute', top: 50, width: 60, height: 40, backgroundColor: '#d4a373', borderRadius: 30 }} />

                {/* Foul Lines */}
                <View style={{ position: 'absolute', top: 0, left: 0, width: 2, height: 600, backgroundColor: 'white', transform: [{ rotate: '-20deg' }] }} />
                <View style={{ position: 'absolute', top: 0, right: 0, width: 2, height: 600, backgroundColor: 'white', transform: [{ rotate: '20deg' }] }} />

                {/* STRIKE ZONE (Center) */}
                <View style={{
                    width: ZONE_W, height: ZONE_H,
                    borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    {/* Grid */}
                    <View style={{ position: 'absolute', width: '100%', height: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                    <View style={{ position: 'absolute', height: '100%', width: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />

                    {/* Ghost Target (Debug - remove later or keep for easy mode) */}
                    {/* <View style={{position:'absolute', left: ZONE_W/2 + targetRef.current.x, top: ZONE_H/2 + targetRef.current.y, width:10, height:10, backgroundColor:'red'}} /> */}

                    {/* THE BALL */}
                    {(gameState === 'pitching' || gameState === 'hit') && (
                        <Animated.View style={{
                            position: 'absolute',
                            width: 30, height: 30, borderRadius: 15,
                            backgroundColor: 'white',
                            borderWidth: 1, borderColor: '#333',
                            shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.5,
                            transform: [
                                { translateX: ballAnim.x },
                                { translateY: ballAnim.y },
                                { scale: ballScale }
                            ],
                            zIndex: 10
                        }}>
                            <View style={{ width: '100%', height: 1, top: 14, backgroundColor: '#f00' }} />
                            <View style={{ height: '100%', width: 1, left: 14, backgroundColor: '#f00' }} />
                        </Animated.View>
                    )}

                    {/* MEET CURSOR (Draggable) */}
                    <Animated.View
                        {...panResponder.panHandlers}
                        style={{
                            position: 'absolute', zIndex: 20,
                            transform: [{ translateX: cursorPan.x }, { translateY: cursorPan.y }]
                        }}
                    >
                        <View style={{
                            width: 60, height: 40, borderRadius: 20,
                            borderWidth: 3, borderColor: '#facc15', // Yellow cursor
                            backgroundColor: 'rgba(255, 255, 0, 0.2)',
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#facc15' }} />
                        </View>
                        <ThemedText style={{ position: 'absolute', top: -20, width: 100, textAlign: 'center', fontSize: 10, color: '#fff', fontWeight: 'bold' }}>DRAG ME</ThemedText>
                    </Animated.View>
                </View>

                {/* BATTER (User Avatar) - Fixed position relative to Zone */}
                <Animated.View style={{
                    position: 'absolute', bottom: 20, left: 20, // Left handed or Right handed
                    alignItems: 'center', pointerEvents: 'none',
                    transform: [{ rotate: bodyRotate }]
                }}>
                    <Animated.View style={{
                        position: 'absolute',
                        right: -30, bottom: 30,
                        width: 10, height: 80, backgroundColor: '#d4a373',
                        borderWidth: 1, borderColor: '#5c4033',
                        transform: [
                            { translateY: 40 },
                            { rotate: batRotate },
                            { translateY: -40 }
                        ]
                    }} />
                    <Image source={getAvatarSource(avatarId)} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                </Animated.View>

                {/* Message Overlay */}
                {resultMsg && (
                    <View style={{ position: 'absolute', top: 100, backgroundColor: 'rgba(0,0,0,0.7)', padding: 10, borderRadius: 10 }}>
                        <ThemedText type="subtitle" style={{ color: '#fbbf24' }}>{resultMsg}</ThemedText>
                    </View>
                )}
            </View>

            <View style={styles.controls}>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: '#3b82f6', flex: 1 }]}
                        onPress={startPitch}
                        disabled={gameState === 'pitching'}
                    >
                        <ThemedText style={styles.btnText}>{gameState === 'pitching' ? 'Pitching...' : 'NEXT PITCH'}</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: '#ef4444', flex: 1, height: 80, justifyContent: 'center' }]}
                        onPress={swing}
                    >
                        <ThemedText style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>SWING!</ThemedText>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.btn, { backgroundColor: colors.subText, marginTop: 10 }]} onPress={onExit}>
                    <ThemedText style={styles.btnText}>Exit</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- 2. Struck Out ---
const StruckOutGame = ({ onExit }: { onExit: () => void }) => {
    const { theme } = useTheme();
    const colors = Themes[theme];
    const [targets, setTargets] = useState<boolean[]>(Array(9).fill(true)); // true = active
    const [balls, setBalls] = useState(12);

    const hit = (index: number) => {
        if (balls <= 0 || !targets[index]) return;
        setBalls(b => b - 1);
        // Simple reflex: Hit is guaranteed if you tap it.
        const newTargets = [...targets];
        newTargets[index] = false;
        setTargets(newTargets);

        if (newTargets.every(t => !t)) {
            Alert.alert("PERFECT!", "You cleared all panels!");
        }
    };

    return (
        <View style={styles.gameContainer}>
            <ThemedText type="subtitle">🎯 Struck Out</ThemedText>
            <ThemedText>Balls Left: {balls}</ThemedText>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 210, height: 210, justifyContent: 'center', marginVertical: 20 }}>
                {targets.map((active, i) => (
                    <TouchableOpacity
                        key={i}
                        style={{
                            width: 60, height: 60, margin: 5,
                            backgroundColor: active ? (i === 4 ? 'red' : colors.primary) : colors.choiceBg,
                            justifyContent: 'center', alignItems: 'center',
                            borderWidth: 1, borderColor: colors.choiceBorder
                        }}
                        onPress={() => hit(i)}
                        disabled={!active || balls <= 0}
                    >
                        <ThemedText style={{ fontSize: 24, opacity: active ? 1 : 0.2 }}>{i + 1}</ThemedText>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.subText }]} onPress={onExit}>
                <ThemedText style={styles.btnText}>Exit</ThemedText>
            </TouchableOpacity>
        </View>
    );
};

// --- 3. Darts ---
const DartsGame = ({ onExit }: { onExit: () => void }) => {
    const { theme } = useTheme();
    const colors = Themes[theme];
    const [cursor, setCursor] = useState(0);
    const [moving, setMoving] = useState(true);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!moving) return;
        const interval = setInterval(() => {
            setCursor(prev => (prev + 5) % 360); // Spinning logic placeholder
        }, 16);
        return () => clearInterval(interval);
    }, [moving]);

    const throwDart = () => {
        setMoving(false);
        // Score logic based on cursor position or random "skill" simulation
        // Simplifying to a simple "Stop at 0, 90, 180, 270"
        const dist = Math.min(Math.abs(cursor - 0), Math.abs(cursor - 360));
        let pts = 0;
        if (dist < 10) pts = 50; // Bullseye
        else if (dist < 30) pts = 20;
        else pts = 5;

        Math.abs(cursor - 0) < 15 ? 100 : Math.abs(cursor - 0) < 45 ? 50 : 10;
        setScore(pts);
        Alert.alert("Result", `${pts} Points!`);
    };

    const reset = () => {
        setMoving(true);
        setScore(0);
    };

    return (
        <View style={styles.gameContainer}>
            <ThemedText type="subtitle">🎯 Darts</ThemedText>
            <View style={{ width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderColor: colors.text, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                {/* Target */}
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                {/* Cursor */}
                <View style={{ position: 'absolute', width: '100%', height: '100%', transform: [{ rotate: `${cursor}deg` }] }}>
                    <View style={{ width: 10, height: 10, backgroundColor: colors.accent, position: 'absolute', top: 0, left: 95, borderRadius: 5 }} />
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={moving ? throwDart : reset}>
                    <ThemedText style={styles.btnText}>{moving ? 'THROW!' : 'AGAIN'}</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: colors.subText }]} onPress={onExit}>
                    <ThemedText style={styles.btnText}>Exit</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- 4. Bowling ---
const BowlingGame = ({ onExit }: { onExit: () => void }) => {
    // Simplified: Just a power bar for now
    const { theme } = useTheme();
    const colors = Themes[theme];
    const [power, setPower] = useState(0);
    const [dir, setDir] = useState(1);
    const [phases, setPhases] = useState<'aim' | 'bowled'>('aim');

    useEffect(() => {
        if (phases !== 'aim') return;
        const int = setInterval(() => {
            setPower(p => {
                if (p >= 100) setDir(-1);
                if (p <= 0) setDir(1);
                return p + (dir * 5);
            });
        }, 30);
        return () => clearInterval(int);
    }, [phases, dir]);

    const bowl = () => {
        setPhases('bowled');
        // High power = good? Or precise 90-100?
        const pins = power > 90 ? 10 : Math.floor(power / 10);
        Alert.alert("Strike?", `You knocked down ${pins} pins!`);
    };

    return (
        <View style={styles.gameContainer}>
            <ThemedText type="subtitle">🎳 Bowling</ThemedText>
            <View style={{ height: 200, width: 50, borderWidth: 1, borderColor: colors.text, justifyContent: 'flex-end', margin: 20 }}>
                <View style={{ height: `${power}%`, backgroundColor: phases === 'bowled' ? 'red' : colors.primary }} />
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]} onPress={phases === 'aim' ? bowl : () => setPhases('aim')}>
                    <ThemedText style={styles.btnText}>{phases === 'aim' ? 'BOWL!' : 'RESET'}</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: colors.subText }]} onPress={onExit}>
                    <ThemedText style={styles.btnText}>Exit</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
};


// =====================================================================
// BOARD GAMES (Sandbox Mode)
// =====================================================================

// --- 5. Shogi ---
const ShogiGame = ({ onExit }: { onExit: () => void }) => {
    const { theme } = useTheme();
    const colors = Themes[theme];
    // Very simplified Shogi Sandbox
    // 9x9 Grid. Empty or Piece string.
    const [board, setBoard] = useState<(string | null)[][]>(
        Array(9).fill(null).map(() => Array(9).fill(null))
    );
    const [selected, setSelected] = useState<{ r: number, c: number } | null>(null);

    // Initial setup (Simplified)
    useEffect(() => {
        const newBoard = [...board];
        newBoard[0][4] = '王'; newBoard[8][4] = '玉';
        newBoard[2][4] = '歩'; newBoard[6][4] = '歩';
        setBoard(newBoard);
    }, []);

    const handleTap = (r: number, c: number) => {
        if (selected) {
            // Move
            const newBoard = [...board];
            newBoard[r][c] = newBoard[selected.r][selected.c];
            newBoard[selected.r][selected.c] = null;
            setBoard(newBoard);
            setSelected(null);
        } else if (board[r][c]) {
            // Select
            setSelected({ r, c });
        }
    };

    return (
        <View style={styles.gameContainer}>
            <ThemedText type="subtitle">☖ Shogi (Sandbox)</ThemedText>
            <View style={{ maxHeight: 400, aspectRatio: 1, flexDirection: 'column', borderWidth: 2, borderColor: '#d4a373' }}>
                {board.map((row, r) => (
                    <View key={r} style={{ flex: 1, flexDirection: 'row' }}>
                        {row.map((cell, c) => (
                            <TouchableOpacity
                                key={c}
                                style={{
                                    flex: 1, borderWidth: 1, borderColor: '#d4a373',
                                    justifyContent: 'center', alignItems: 'center', backgroundColor: selected?.r === r && selected?.c === c ? 'rgba(255,255,0,0.3)' : '#f3d5b5'
                                }}
                                onPress={() => handleTap(r, c)}
                            >
                                <ThemedText style={{ color: '#000', fontWeight: 'bold' }}>{cell || ''}</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.subText, marginTop: 10 }]} onPress={onExit}>
                <ThemedText style={styles.btnText}>Exit</ThemedText>
            </TouchableOpacity>
        </View>
    );
};

// --- 6. Chess ---
const ChessGame = ({ onExit }: { onExit: () => void }) => {
    const { theme } = useTheme();
    const colors = Themes[theme];
    const [board, setBoard] = useState<(string | null)[][]>(Array(8).fill(null).map(() => Array(8).fill(null)));
    const [selected, setSelected] = useState<{ r: number, c: number } | null>(null);

    // Initial setup
    useEffect(() => {
        const b = Array(8).fill(null).map(() => Array(8).fill(null));
        b[0] = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
        b[1] = Array(8).fill('♟');
        b[6] = Array(8).fill('♙');
        b[7] = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
        setBoard(b);
    }, []);

    const handleTap = (r: number, c: number) => {
        if (selected) {
            const newBoard = board.map(row => [...row]);
            newBoard[r][c] = newBoard[selected.r][selected.c];
            newBoard[selected.r][selected.c] = null;
            setBoard(newBoard);
            setSelected(null);
        } else if (board[r][c]) {
            setSelected({ r, c });
        }
    };

    return (
        <View style={styles.gameContainer}>
            <ThemedText type="subtitle">♟ Chess (Sandbox)</ThemedText>
            <View style={{ maxHeight: 350, aspectRatio: 1, borderWidth: 2, borderColor: '#333' }}>
                {board.map((row, r) => (
                    <View key={r} style={{ flex: 1, flexDirection: 'row' }}>
                        {row.map((cell, c) => (
                            <TouchableOpacity
                                key={c}
                                style={{
                                    flex: 1, justifyContent: 'center', alignItems: 'center',
                                    backgroundColor: (r + c) % 2 === 0 ? '#f0d9b5' : '#b58863',
                                    borderWidth: selected?.r === r && selected?.c === c ? 2 : 0, borderColor: 'red'
                                }}
                                onPress={() => handleTap(r, c)}
                            >
                                <ThemedText style={{ fontSize: 24 }}>{cell || ''}</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.subText, marginTop: 10 }]} onPress={onExit}>
                <ThemedText style={styles.btnText}>Exit</ThemedText>
            </TouchableOpacity>
        </View>
    );
};

// --- 7. Go (Igo) ---
const GoGame = ({ onExit }: { onExit: () => void }) => {
    const { theme } = useTheme();
    const colors = Themes[theme];
    const SIZE = 9; // 9x9 for quick games
    const [board, setBoard] = useState<(string | null)[][]>(Array(SIZE).fill(null).map(() => Array(SIZE).fill(null)));
    const [turn, setTurn] = useState<'B' | 'W'>('B');

    const placeStone = (r: number, c: number) => {
        if (board[r][c]) return;
        const newBoard = board.map(rw => [...rw]);
        newBoard[r][c] = turn;
        setBoard(newBoard);
        setTurn(t => t === 'B' ? 'W' : 'B');
    };

    return (
        <View style={styles.gameContainer}>
            <ThemedText type="subtitle">⚫ Go (9x9)</ThemedText>
            <ThemedText>Turn: {turn === 'B' ? 'Black' : 'White'}</ThemedText>
            <View style={{ width: 300, height: 300, backgroundColor: '#eeb', padding: 10, marginVertical: 10 }}>
                {/* Grid Lines */}
                {Array(SIZE).fill(0).map((_, i) => (
                    <View key={`h-${i}`} style={{ position: 'absolute', left: 15, right: 15, top: 15 + i * 33.5, height: 1, backgroundColor: '#000' }} />
                ))}
                {Array(SIZE).fill(0).map((_, i) => (
                    <View key={`v-${i}`} style={{ position: 'absolute', top: 15, bottom: 15, left: 15 + i * 33.5, width: 1, backgroundColor: '#000' }} />
                ))}

                {/* Touch Points */}
                <View style={{ flex: 1 }}>
                    {board.map((row, r) => (
                        <View key={r} style={{ flex: 1, flexDirection: 'row' }}>
                            {row.map((cell, c) => (
                                <TouchableOpacity
                                    key={c}
                                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => placeStone(r, c)}
                                >
                                    {cell && (
                                        <View style={{
                                            width: 24, height: 24, borderRadius: 12,
                                            backgroundColor: cell === 'B' ? '#000' : '#fff',
                                            borderWidth: 1, borderColor: '#555',
                                            shadowOpacity: 0.5, shadowRadius: 2, elevation: 3
                                        }} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.subText }]} onPress={onExit}>
                <ThemedText style={styles.btnText}>Exit</ThemedText>
            </TouchableOpacity>
        </View>
    );
};

// =====================================================================
// MAIN HUB
// =====================================================================

export const GameCenter = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const { theme } = useTheme();
    const colors = Themes[theme];
    const [activeGame, setActiveGame] = useState<GameType>('menu');

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={[styles.hubContainer, { backgroundColor: colors.background, borderColor: colors.choiceBorder }]}>

                    {/* Header */}
                    <View style={styles.header}>
                        <ThemedText type="title">🏟️ Grand Game Center</ThemedText>
                    </View>

                    {/* Content */}
                    <View style={{ flex: 1, padding: 20 }}>
                        {activeGame === 'menu' && (
                            <ScrollView>
                                <ThemedText type="subtitle" style={{ marginBottom: 10 }}>1F: Sports Floor</ThemedText>
                                <View style={styles.floorGrid}>
                                    <GameBtn title="⚾ Batting" onPress={() => setActiveGame('batting')} color="#ef4444" />
                                    <GameBtn title="🎯 Struck Out" onPress={() => setActiveGame('struckout')} color="#f59e0b" />
                                    <GameBtn title="🎯 Darts" onPress={() => setActiveGame('darts')} color="#10b981" />
                                    <GameBtn title="🎳 Bowling" onPress={() => setActiveGame('bowling')} color="#3b82f6" />
                                </View>

                                <ThemedText type="subtitle" style={{ marginTop: 20, marginBottom: 10 }}>2F: Board Game Floor</ThemedText>
                                <View style={styles.floorGrid}>
                                    <GameBtn title="☖ Shogi" onPress={() => setActiveGame('shogi')} color="#8b5cf6" />
                                    <GameBtn title="♟ Chess" onPress={() => setActiveGame('chess')} color="#6366f1" />
                                    <GameBtn title="⚫ Go" onPress={() => setActiveGame('go')} color="#14b8a6" />
                                </View>

                                <TouchableOpacity style={[styles.btn, { backgroundColor: colors.subText, marginTop: 30 }]} onPress={onClose}>
                                    <ThemedText style={styles.btnText}>Leave Game Center</ThemedText>
                                </TouchableOpacity>
                            </ScrollView>
                        )}

                        {activeGame === 'batting' && <BattingGame onExit={() => setActiveGame('menu')} />}
                        {activeGame === 'struckout' && <StruckOutGame onExit={() => setActiveGame('menu')} />}
                        {activeGame === 'darts' && <DartsGame onExit={() => setActiveGame('menu')} />}
                        {activeGame === 'bowling' && <BowlingGame onExit={() => setActiveGame('menu')} />}
                        {activeGame === 'shogi' && <ShogiGame onExit={() => setActiveGame('menu')} />}
                        {activeGame === 'chess' && <ChessGame onExit={() => setActiveGame('menu')} />}
                        {activeGame === 'go' && <GoGame onExit={() => setActiveGame('menu')} />}
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const GameBtn = ({ title, onPress, color }: { title: string, onPress: () => void, color: string }) => (
    <TouchableOpacity style={[styles.gameBtn, { backgroundColor: color }]} onPress={onPress}>
        <ThemedText style={styles.gameBtnText}>{title}</ThemedText>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
    hubContainer: { flex: 1, borderRadius: 20, borderWidth: 1, overflow: 'hidden' },
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#333', alignItems: 'center' },
    floorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
    gameBtn: { width: '45%', padding: 20, borderRadius: 15, alignItems: 'center', elevation: 5 },
    gameBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    btn: { padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 5 },
    btnText: { color: '#fff', fontWeight: 'bold' },
    gameContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    controls: { width: '100%', alignItems: 'center', marginTop: 20 },
});

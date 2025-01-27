import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;
import java.util.Random;

public class BouncingBallGame extends JPanel implements KeyListener, ActionListener {
    private int paddleX = 200;
    private int paddleY = 450;
    private int ballX;
    private int ballY;
    private int ballXSpeed = 1;
    private int ballYSpeed = 1;
    private int score = 0;
    private int highestScore = 0;
    private boolean gameOver = false;
    private JButton restartButton;
    private Timer timer;
    private Random random;

    public BouncingBallGame() {
        JFrame frame = new JFrame("Bouncing Ball Game");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setExtendedState(JFrame.MAXIMIZED_BOTH); // Set the frame to full screen
        frame.setUndecorated(true); // Remove the frame decorations
        frame.addKeyListener(this);

        restartButton = new JButton("Restart");
        restartButton.setBounds(200, 225, 100, 50);
        restartButton.addActionListener(this);
        restartButton.setVisible(false);
        frame.add(restartButton);

        frame.add(this);
        frame.setVisible(true);

        random = new Random();
        ballX = random.nextInt(getWidth() - 20);
        ballY = random.nextInt(getHeight() - 20);

        timer = new Timer(10, this);
        timer.start();
    }

    private void moveBall() {
        ballX += ballXSpeed;
        ballY += ballYSpeed;

        if (ballX <= 0 || ballX >= getWidth() - 20) {
            ballXSpeed = -ballXSpeed;
        }
        if (ballY <= 0 || ballY >= getHeight() - 20) {
            ballYSpeed = -ballYSpeed;
        }

        if (ballX < paddleX + 80 && ballX + 20 > paddleX && ballY < paddleY + 10 && ballY + 20 > paddleY) {
            ballYSpeed = -ballYSpeed;
            score++;
        } else if (ballY >= getHeight() - 20) {
            gameOver = true;
        }
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.BLUE);
        g.fillOval(ballX, ballY, 20, 20);
        g.setColor(Color.RED);
        g.fillRect(paddleX, paddleY, 80, 10);

        g.setColor(Color.BLACK);
        g.setFont(new Font("Arial", Font.BOLD, 16));
        g.drawString("Score: " + score, 10, 20);
        g.drawString("Highest Score: " + highestScore, 10, 40);

        if (gameOver) {
            g.setFont(new Font("Arial", Font.BOLD, 20));
            g.drawString("Game Over", 200, 200);
            timer.stop();
            restartButton.setVisible(true);
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == timer) {
            moveBall();
            repaint();
        } else if (e.getSource() == restartButton) {
            gameOver = false;
            restartButton.setVisible(false);
            ballX = random.nextInt(getWidth() - 20);
            ballY = random.nextInt(getHeight() - 20);
            ballXSpeed = 1;
            ballYSpeed = 1;
            score = 0;
            timer.start();
        }
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (e.getKeyCode() == KeyEvent.VK_LEFT) {
            paddleX -= 10;
        } else if (e.getKeyCode() == KeyEvent.VK_RIGHT) {
            paddleX += 10;
        }

        if (paddleX < 0) {
            paddleX = 0;
        } else if (paddleX > getWidth() - 80) {
            paddleX = getWidth() - 80;
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {
    }

    @Override
    public void keyTyped(KeyEvent e) {
    }

    public static void main(String[] args) {
        new BouncingBallGame();
    }
}

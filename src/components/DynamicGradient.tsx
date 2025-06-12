import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { createNoise3D } from 'simplex-noise';

interface DynamicGradientProps {
  className?: string;
}

const DynamicGradient: React.FC<DynamicGradientProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const modelRef = useRef<tf.LayersModel | null>(null);
  const noise3D = useRef(createNoise3D());
  const animationRef = useRef<number>(0); // Add missing ref

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create a simple neural network model
    const createModel = () => {
      // Create a sequential model
      const model = tf.sequential();
      
      // Add layers (simple model for color prediction)
      model.add(tf.layers.dense({
        inputShape: [1], // Time of day as input
        units: 16,
        activation: 'relu'
      }));
      
      model.add(tf.layers.dense({
        units: 9, // 3 colors with RGB values
        activation: 'sigmoid'
      }));
      
      // Compile the model
      model.compile({
        optimizer: tf.train.adam(),
        loss: 'meanSquaredError'
      });
      
      return model;
    };

    // Train the model with some predefined color schemes for different times
    const trainModel = async (model: tf.LayersModel) => {
      // Training data: time of day (0-24) -> RGB colors (normalized 0-1)
      const timeOfDay = tf.tensor2d([0, 6, 12, 18, 24], [5, 1]);
      
      // Colors for different times: midnight, morning, noon, evening, midnight
      const colors = tf.tensor2d([
        [0.1, 0.1, 0.3, 0.2, 0.2, 0.5, 0.1, 0.1, 0.3], // midnight (dark blue)
        [0.9, 0.6, 0.4, 1.0, 0.8, 0.6, 0.9, 0.7, 0.5], // sunrise (orange/yellow)
        [0.5, 0.8, 1.0, 0.6, 0.9, 1.0, 0.7, 1.0, 1.0], // noon (bright blue/white)
        [0.9, 0.4, 0.2, 0.8, 0.3, 0.1, 0.7, 0.2, 0.1], // sunset (orange/red)
        [0.1, 0.1, 0.3, 0.2, 0.2, 0.5, 0.1, 0.1, 0.3]  // midnight again (dark blue)
      ]);
      
      // Train the model
      await model.fit(timeOfDay, colors, {
        epochs: 100,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
          }
        }
      });
      
      return model;
    };

    // Animation function
    const animate = (time: number) => {
      if (!canvas || !ctx || !modelRef.current) return;
      
      const { width, height } = canvas;
      
      // Get current hour (0-24)
      const date = new Date();
      const currentHour = date.getHours() + date.getMinutes() / 60;
      
      // Predict colors based on time of day
      const prediction = modelRef.current.predict(tf.tensor2d([currentHour], [1, 1])) as tf.Tensor;
      const predictedColors = prediction.dataSync();
      
      // Create gradient with predicted colors
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `rgb(${predictedColors[0] * 255}, ${predictedColors[1] * 255}, ${predictedColors[2] * 255})`);
      gradient.addColorStop(0.5, `rgb(${predictedColors[3] * 255}, ${predictedColors[4] * 255}, ${predictedColors[5] * 255})`);
      gradient.addColorStop(1, `rgb(${predictedColors[6] * 255}, ${predictedColors[7] * 255}, ${predictedColors[8] * 255})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Apply noise pattern
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          // Generate noise value
          const noise = noise3D.current(
            x / 200, 
            y / 200,
            time / 5000
          ) * 0.15;
          
          const pixelIndex = (y * width + x) * 4;
          
          // Apply noise to RGB channels
          data[pixelIndex] = Math.min(255, Math.max(0, data[pixelIndex] + noise * 50));
          data[pixelIndex + 1] = Math.min(255, Math.max(0, data[pixelIndex + 1] + noise * 50));
          data[pixelIndex + 2] = Math.min(255, Math.max(0, data[pixelIndex + 2] + noise * 50));
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      requestRef.current = requestAnimationFrame(animate);
    };

    // Initialize and train model
    const initModel = async () => {
      try {
        // Try to load saved model first
        try {
          const savedModel = await tf.loadLayersModel('indexeddb://dynamic-gradient-model');
          console.log('Loaded saved model');
          modelRef.current = savedModel;
        } catch (e) {
          console.log('No saved model found, creating new one');
          // Create model
          const model = createModel();
          
          // Train model
          await trainModel(model);
          
          // Save model for future use
          await model.save('indexeddb://dynamic-gradient-model');
          
          // Store model reference
          modelRef.current = model;
        }
        
        // Start animation loop
        requestRef.current = requestAnimationFrame(animate);
      } catch (error) {
        console.error('Error initializing model:', error);
      }
    };
    
    initModel();
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default DynamicGradient;
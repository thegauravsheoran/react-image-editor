import React, { useEffect, useRef, useState } from 'react';
import * as Fabric from 'fabric';
import '../styles/CanvasEditor.css';

const CanvasEditor = ({ image }) => {
  const [canvas, setCanvas] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const colors = [
    '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#800000', '#808000', '#008000', '#800080', '#808080', '#C0C0C0', '#FFA500', '#A52A2A',
    '#8A2BE2', '#5F9EA0', '#7FFF00', '#D2691E', '#DC143C', '#00CED1', '#9400D3', '#FFD700',
  ];

  useEffect(() => {
    const canvasEl = document.getElementById('editor-canvas');

    if (canvas) {
      canvas.dispose();
    }
    const staticCanvas = new Fabric.Canvas(canvasEl, {
      backgroundColor: '#f3f3f3',
    });

    setCanvas(staticCanvas);

    const loadImage = async () => {
      if (image) {
        try {
          const img = await Fabric.FabricImage.fromURL(image, {
            crossOrigin: 'anonymous',
          });
          staticCanvas.setDimensions({ width: img.width, height: img.height });
          staticCanvas.backgroundImage = img;
          staticCanvas.renderAll();
        } catch (error) {
          console.error('Error loading image:', error);
        }
      }
    };

    loadImage();

    return () => {
      staticCanvas.dispose();
    };
  }, [image]);

  const addText = () => {
    if (!canvas) return;
    const text = new Fabric.IText('Your text here', {
      left: 50,
      top: 50,
      fontSize: 24,
      fill: selectedColor,
      selectable: true,
    });
    canvas.add(text);
    canvas.renderAll();
  };

  const addShape = (shape) => {
    if (!canvas) return;

    let shapeObj;
    switch (shape) {
      case 'rectangle':
        shapeObj = new Fabric.Rect({
          width: 100,
          height: 60,
          fill: selectedColor,
          left: 100,
          top: 100,
          selectable: true,
        });
        break;
      case 'circle':
        shapeObj = new Fabric.Circle({
          radius: 50,
          fill: selectedColor,
          left: 150,
          top: 150,
          selectable: true,
        });
        break;
      case 'triangle':
        shapeObj = new Fabric.Triangle({
          width: 100,
          height: 100,
          fill: selectedColor,
          left: 200,
          top: 200,
          selectable: true,
        });
        break;
      default:
        return;
    }

    canvas.add(shapeObj);
    canvas.renderAll();
  };

  const removeSelected = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    } else {
      alert('No object selected to remove!');
    }
  };

    const logCanvasLayers = () => {
    if (!canvas) {
      console.log('Canvas is not initialized.');
      return;
    }
  
    const layers = canvas.getObjects().map((obj, index) => {
      return {
        index: index + 1,
        type: obj.type,
        left: obj.left,
        top: obj.top,
        width: obj.width || null,
        height: obj.height || null,
        radius: obj.radius || null,
        fill: obj.fill || null,
        text: obj.text || null,
        id: obj.id || null,
      };
    });
  
    console.log('Canvas Layers:', layers);
  };

  const downloadImage = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="editor-container">
      <div className="canvas-area">
        <canvas id="editor-canvas" className="canvas-element"></canvas>
      </div>

      <div className="tools-area">
        <div className="color-palette">
          {colors.map((color) => (
            <button
              key={color}
              className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => {
                setSelectedColor(color)
              }
              }
            ></button>
          ))}
        </div>
        <button className="tool-btn" onClick={addText}>Add Text</button>
        <button className="tool-btn" onClick={() => addShape('rectangle')}>Rectangle</button>
        <button className="tool-btn" onClick={() => addShape('circle')}>Circle</button>
        <button className="tool-btn" onClick={() => addShape('triangle')}>Triangle</button>
        <button className="tool-btn" onClick={removeSelected}>Remove Selected</button>
        <button className="tool-btn" onClick={logCanvasLayers}>Log Canvas Layers</button>
        <button className="download-btn" onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
};

export default CanvasEditor;
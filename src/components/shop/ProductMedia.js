import React from 'react';

const TechnicalHeader = ({ code, title }) => (
  <div className="product-art-header">
    <span>{code}</span>
    <strong>{title}</strong>
    <span>REV.01</span>
  </div>
);

const RoboticsArt = ({ detail }) => (
  <div className="product-art technical-poster robotics-art">
    <TechnicalHeader code="RM—01" title="ROBOTICS / MATHEMATICS" />
    <div className="robotics-equation">T<sup>0</sup><sub>n</sub> = ∏ T<sup>i−1</sup><sub>i</sub>(q<sub>i</sub>)</div>
    <div className="robot-arm-diagram" aria-hidden="true">
      <span className="robot-joint joint-a" />
      <span className="robot-link link-a" />
      <span className="robot-joint joint-b" />
      <span className="robot-link link-b" />
      <span className="robot-joint joint-c" />
      <span className="robot-axis axis-x">x</span>
      <span className="robot-axis axis-y">y</span>
    </div>
    <div className="poster-module-row">
      <span>SE(3)</span><span>FK</span><span>IK</span><span>J(q)</span>
    </div>
    {detail && <div className="poster-detail-copy">POSITION · ORIENTATION · VELOCITY · SINGULARITY · TRAJECTORY</div>}
    <div className="poster-index">01 / KINEMATICS<br />02 / DIFFERENTIAL MOTION<br />03 / DYNAMICS</div>
  </div>
);

const ControlArt = ({ detail }) => (
  <div className="product-art technical-poster control-art">
    <TechnicalHeader code="CS—02" title="CONTROL SYSTEMS" />
    <div className="control-loop" aria-hidden="true">
      <span className="control-node">r(t)</span><i />
      <span className="control-sum">Σ</span><i />
      <span className="control-block">C(s)</span><i />
      <span className="control-block">G(s)</span><i />
      <span className="control-node">y(t)</span>
    </div>
    <div className="control-plot" aria-hidden="true"><i /><i /><i /><i /></div>
    <div className="poster-module-row">
      <span>PID</span><span>BODE</span><span>LQR</span><span>KF</span>
    </div>
    {detail && <div className="poster-detail-copy">STABILITY · OBSERVABILITY · ESTIMATION · ROBUSTNESS</div>}
    <div className="poster-index">A(s)x = B(s)u<br />ẋ = Ax + Bu<br />y = Cx + Du</div>
  </div>
);

const EmbeddedArt = ({ detail }) => (
  <div className="product-art technical-poster embedded-art">
    <TechnicalHeader code="ES—03" title="EMBEDDED SYSTEMS" />
    <div className="board-diagram" aria-hidden="true">
      <span className="board-chip">MCU<small>32 BIT</small></span>
      <span className="board-bus bus-a" /><span className="board-bus bus-b" />
      <span className="board-port port-a">SPI</span><span className="board-port port-b">I²C</span>
      <span className="board-port port-c">UART</span><span className="board-port port-d">ADC</span>
    </div>
    <div className="poster-module-row">
      <span>POWER</span><span>LOGIC</span><span>RTOS</span><span>DEBUG</span>
    </div>
    {detail && <div className="poster-detail-copy">INTERRUPTS · TIMERS · DMA · MEMORY · PROTOCOLS</div>}
    <div className="poster-index">VDD 3V3 · 48 MHz<br />SWD / JTAG<br />HARD REAL-TIME</div>
  </div>
);

const NotebookArt = ({ detail }) => (
  <div className="product-art object-stage notebook-art">
    <div className={`notebook-object ${detail ? 'notebook-open' : ''}`}>
      <div className="notebook-cover">
        <span className="notebook-code">EN—01</span>
        <strong>THE<br />ENGINEER’S<br />NOTEBOOK</strong>
        <span className="notebook-rule" />
        <small>FIELD NOTES / CALCULATIONS / TESTS</small>
      </div>
      <div className="notebook-pages" />
    </div>
    <span className="object-caption">A5 / 192 PAGES / DOT GRID</span>
  </div>
);

const DeskMatArt = ({ detail }) => (
  <div className="product-art object-stage desk-mat-art">
    <div className={`desk-mat-object ${detail ? 'desk-mat-close' : ''}`}>
      <span className="mat-title">ENGINEERING / QUICK REFERENCE</span>
      <div className="mat-columns"><i /><i /><i /><i /><i /><i /></div>
      <div className="mat-ruler" />
      <span className="mat-code">DM—01</span>
    </div>
    <span className="object-caption">LOW CONTRAST / MICRO-TEXTURE / STITCHED EDGE</span>
  </div>
);

const EngineeringOsArt = ({ detail }) => (
  <div className="product-art digital-stage engineering-os-art">
    <div className={`os-window ${detail ? 'os-detail' : ''}`}>
      <div className="os-topbar"><span>ENGINEERING OS</span><span>SYS / 01</span></div>
      <div className="os-layout">
        <div className="os-sidebar"><i /><i /><i /><i /><i /></div>
        <div className="os-main">
          <span className="os-kicker">PROJECT / AUTONOMOUS ARM</span>
          <strong>{detail ? 'Experiment log' : 'System overview'}</strong>
          <div className="os-metrics"><i>REQ</i><i>CAD</i><i>TEST</i></div>
          <div className="os-table"><i /><i /><i /><i /></div>
        </div>
      </div>
    </div>
    <span className="object-caption">FILES / DECISIONS / BUILDS / KNOWLEDGE</span>
  </div>
);

const ProductMedia = ({ media, productName, className = '', compact = false }) => {
  if (media && media.src) {
    return (
      <img
        src={media.src}
        srcSet={media.srcSet}
        sizes={media.sizes || '(min-width: 1024px) 50vw, 100vw'}
        alt={media.alt || productName}
        className={`product-media-image ${className}`}
        loading={compact ? 'lazy' : 'eager'}
        decoding="async"
      />
    );
  }

  const render = media ? media.render : 'robotics-map';
  let artwork;
  if (render.startsWith('control')) artwork = <ControlArt detail={render.includes('detail')} />;
  else if (render.startsWith('embedded')) artwork = <EmbeddedArt detail={render.includes('detail')} />;
  else if (render.startsWith('notebook')) artwork = <NotebookArt detail={render.includes('detail')} />;
  else if (render.startsWith('desk-mat')) artwork = <DeskMatArt detail={render.includes('detail')} />;
  else if (render.startsWith('engineering-os')) artwork = <EngineeringOsArt detail={render.includes('detail')} />;
  else artwork = <RoboticsArt detail={render.includes('detail')} />;

  return (
    <div
      className={`product-media product-media--${compact ? 'compact' : 'full'} ${className}`}
      role="img"
      aria-label={(media && media.alt) || productName}
    >
      {artwork}
    </div>
  );
};

export default ProductMedia;


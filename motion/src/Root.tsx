import React from 'react';
import {Composition} from 'remotion';
import {FPS} from './lib/brand';
import {SPOT_FRAMES, Spot, SpotProps} from './Spot';

export const Root: React.FC = () => (
  <Composition
    id="Spot15Vertical"
    component={Spot as React.FC<Record<string, unknown>>}
    defaultProps={{voiceover: false} satisfies SpotProps}
    durationInFrames={SPOT_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
  />
);

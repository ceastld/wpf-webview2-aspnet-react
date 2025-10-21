import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useRealtime } from '../hooks/useRealtime';

export default function RealtimeClock() {
  const currentTime = useRealtime();

  return (
    <Card className="shadow-lg rounded-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <Typography variant="h6" className="mb-4 text-gray-800 font-semibold">
          Real-time Clock
        </Typography>
        <Typography 
          variant="h4" 
          className="text-center font-mono text-blue-600 bg-gray-50 rounded-lg p-4"
        >
          {currentTime}
        </Typography>
        <Typography variant="body2" className="text-center text-gray-500 mt-2">
          Connected via SignalR
        </Typography>
      </CardContent>
    </Card>
  );
}

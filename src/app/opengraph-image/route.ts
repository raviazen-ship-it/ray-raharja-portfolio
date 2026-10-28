import React from 'react';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0B',
          padding: '44px',
          color: '#EDE8DF',
          fontFamily: 'Georgia, serif',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#131316',
            border: '2px solid rgba(181, 137, 59, 0.55)',
            padding: '42px 52px',
          },
        },
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(181, 137, 59, 0.35)',
              paddingBottom: '22px',
            },
          },
          React.createElement(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              },
            },
            React.createElement(
              'div',
              {
                style: {
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0A0A0B',
                  border: '1.5px solid #B5893B',
                  color: '#D4AF6A',
                  fontSize: '22px',
                  fontWeight: 600,
                },
              },
              'R'
            ),
            React.createElement(
              'span',
              {
                style: {
                  fontSize: '14px',
                  letterSpacing: '0.2em',
                  color: '#8A857C',
                  fontFamily: 'sans-serif',
                },
              },
              'INTEGRATED PORTFOLIO 2025-2026'
            )
          ),
          React.createElement(
            'span',
            {
              style: {
                fontSize: '14px',
                letterSpacing: '0.2em',
                color: '#D4AF6A',
                fontFamily: 'sans-serif',
              },
            },
            'NORTH JAKARTA, INDONESIA'
          )
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            },
          },
          React.createElement(
            'span',
            {
              style: {
                fontSize: '15px',
                letterSpacing: '0.22em',
                color: '#D4AF6A',
                fontFamily: 'sans-serif',
              },
            },
            'WEB & DIGITAL PRODUCTS • VISUAL DESIGN & PRODUCTION'
          ),
          React.createElement(
            'div',
            {
              style: {
                fontSize: '74px',
                color: '#EDE8DF',
                lineHeight: 1.04,
              },
            },
            'Ray Raharja Santoso.'
          ),
          React.createElement(
            'div',
            {
              style: {
                fontSize: '28px',
                fontStyle: 'italic',
                color: '#D4AF6A',
              },
            },
            'Designing useful digital experiences. Building them to work.'
          )
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(181, 137, 59, 0.35)',
              paddingTop: '20px',
              fontSize: '13px',
              letterSpacing: '0.18em',
              color: '#8A857C',
              fontFamily: 'sans-serif',
            },
          },
          React.createElement(
            'span',
            null,
            '5 LIVE WEB CASE STUDIES • 12 VISUAL & PRINT WORKS'
          ),
          React.createElement(
            'span',
            { style: { color: '#D4AF6A' } },
            'RAY-RAHARJA-PORTFOLIO.VERCEL.APP'
          )
        )
      )
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

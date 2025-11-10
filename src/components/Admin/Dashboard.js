import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// Datos de ejemplo
const monthlyData = [
  { name: 'Ene', ingresos: 4000, referidos: 24 },
  { name: 'Feb', ingresos: 3000, referidos: 13 },
  { name: 'Mar', ingresos: 2000, referidos: 8 },
  { name: 'Abr', ingresos: 2780, referidos: 19 },
  { name: 'May', ingresos: 1890, referidos: 15 },
  { name: 'Jun', ingresos: 2390, referidos: 18 },
];

const pieData = [
  { name: 'Servicios', value: 400 },
  { name: 'Productos', value: 300 },
  { name: 'Suscripciones', value: 200 },
  { name: 'Otros', value: 100 },
];

const COLORS = ['#6e8efb', '#a777e3', '#ff6b6b', '#4ecdc4'];

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ 
    height: '100%', 
    boxShadow: 3, 
    borderRadius: 2, 
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)'
    }
  }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="textSecondary" gutterBottom sx={{ 
            fontWeight: 500, 
            color: '#666',
            fontSize: '0.9rem'
          }}>
            {title}
          </Typography>
          <Typography variant="h5" component="div" sx={{ 
            fontWeight: 'bold', 
            color: '#333',
            fontSize: '1.5rem'
          }}>
            {title.includes('$') ? value : `$${value}`}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            fontSize: '24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const theme = useTheme();

  // Calcular totales
  const totalIngresos = monthlyData.reduce((sum, item) => sum + item.ingresos, 0);
  const totalReferidos = monthlyData.reduce((sum, item) => sum + item.referidos, 0);
  const ingresosMensuales = monthlyData[monthlyData.length - 1]?.ingresos || 0;

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ 
        mb: 4, 
        fontWeight: 'bold', 
        color: theme.palette.primary.main,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        position: 'relative',
        '&:after': {
          content: '""',
          display: 'block',
          width: '60px',
          height: '4px',
          background: 'linear-gradient(90deg, #6e8efb, #a777e3)',
          margin: '10px auto 0',
          borderRadius: '2px'
        }
      }}>
        Panel de Administración
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Ingresos Totales" 
            value={totalIngresos.toLocaleString()} 
            icon="💰" 
            color={theme.palette.primary.main} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Referidos Totales" 
            value={totalReferidos} 
            icon="👥" 
            color="#a777e3" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Clientes Activos" 
            value="856" 
            icon="👥" 
            color="#4ecdc4" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Ingresos Mensuales" 
            value={ingresosMensuales.toLocaleString()} 
            icon="📈" 
            color="#ff6b6b" 
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: 3, 
            height: '100%', 
            borderRadius: 2, 
            boxShadow: 3,
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: '600',
              color: '#444',
              display: 'flex',
              alignItems: 'center',
              '&:before': {
                content: '""',
                display: 'inline-block',
                width: '4px',
                height: '20px',
                background: theme.palette.primary.main,
                marginRight: '10px',
                borderRadius: '2px'
              }
            }}>
              Ingresos Mensuales
            </Typography>
            <Box sx={{ height: 350, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#ddd' }}
                  />
                  <YAxis 
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#ddd' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value, name) => 
                      name === 'ingresos' 
                        ? [`$${value.toLocaleString()}`, 'Ingresos'] 
                        : [value, 'Referidos']
                    }
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.98)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                  <Bar 
                    dataKey="ingresos" 
                    name="Ingresos" 
                    fill={theme.palette.primary.main}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="referidos" 
                    name="Referidos" 
                    fill="#a777e3" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            height: '100%', 
            borderRadius: 2, 
            boxShadow: 3,
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: '600',
              color: '#444',
              display: 'flex',
              alignItems: 'center',
              '&:before': {
                content: '""',
                display: 'inline-block',
                width: '4px',
                height: '20px',
                background: theme.palette.primary.main,
                marginRight: '10px',
                borderRadius: '2px'
              }
            }}>
              Distribución de Ingresos
            </Typography>
            <Box sx={{ height: 350, position: 'relative', mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`$${value}`, name]}
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.98)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                      paddingLeft: '20px',
                      fontSize: '0.8rem'
                    }}
                    formatter={(value, entry, index) => (
                      <span style={{ color: '#666' }}>
                        {value}: ${pieData[index]?.value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Sección de transacciones recientes */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: 2, 
            boxShadow: 3,
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: '600',
              color: '#444',
              display: 'flex',
              alignItems: 'center',
              '&:before': {
                content: '""',
                display: 'inline-block',
                width: '4px',
                height: '20px',
                background: theme.palette.primary.main,
                marginRight: '10px',
                borderRadius: '2px'
              }
            }}>
              Transacciones Recientes
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ 
                    backgroundColor: '#f5f7fa',
                    borderBottom: '2px solid #e1e4e8'
                  }}>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'left',
                      color: '#555',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>ID</th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'left',
                      color: '#555',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Cliente</th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'right',
                      color: '#555',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Monto</th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'center',
                      color: '#555',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Estado</th>
                    <th style={{ 
                      padding: '12px 16px', 
                      textAlign: 'right',
                      color: '#555',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: '#INV-0001', cliente: 'Juan Pérez', monto: 1250, estado: 'Completado', fecha: '05 Nov 2023' },
                    { id: '#INV-0002', cliente: 'María García', monto: 850, estado: 'Pendiente', fecha: '04 Nov 2023' },
                    { id: '#INV-0003', cliente: 'Carlos López', monto: 2200, estado: 'Completado', fecha: '03 Nov 2023' },
                    { id: '#INV-0004', cliente: 'Ana Martínez', monto: 450, estado: 'Cancelado', fecha: '02 Nov 2023' },
                    { id: '#INV-0005', cliente: 'Luis Rodríguez', monto: 1800, estado: 'Completado', fecha: '01 Nov 2023' },
                  ].map((item, index) => (
                    <tr 
                      key={item.id}
                      style={{
                        borderBottom: '1px solid #eaeef2',
                        '&:hover': {
                          backgroundColor: '#f8fafc'
                        }
                      }}
                    >
                      <td style={{ 
                        padding: '12px 16px',
                        color: '#4a5568',
                        fontSize: '0.9rem'
                      }}>{item.id}</td>
                      <td style={{ 
                        padding: '12px 16px',
                        color: '#4a5568',
                        fontSize: '0.9rem'
                      }}>{item.cliente}</td>
                      <td style={{ 
                        padding: '12px 16px',
                        textAlign: 'right',
                        color: '#4a5568',
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}>${item.monto.toLocaleString()}</td>
                      <td style={{ 
                        padding: '12px 16px',
                        textAlign: 'center'
                      }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          backgroundColor: item.estado === 'Completado' 
                            ? 'rgba(72, 187, 120, 0.15)' 
                            : item.estado === 'Pendiente'
                            ? 'rgba(247, 144, 9, 0.15)'
                            : 'rgba(229, 62, 62, 0.15)',
                          color: item.estado === 'Completado' 
                            ? '#239a3b' 
                            : item.estado === 'Pendiente'
                            ? '#c05621'
                            : '#c53030'
                        }}>
                          {item.estado}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '12px 16px',
                        textAlign: 'right',
                        color: '#718096',
                        fontSize: '0.85rem'
                      }}>{item.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
# -*- coding: utf-8 -*-
"""
Created on Sat Mar 16 04:50:55 2019

@author: Yuvraj
"""

# Original code is here: https://github.com/yuvraj97/Curiosity/tree/master/Mathematics/18.02%20-%20Multivariable%20Calculus%20(Fall%202007)/Plot%20Two%20Variable

import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

class MultiVariable:
    
    def __init__(self, count=10, x_range=(-10,10), y_range=(-10,10)):
        self._x_start_ = x_range[0]
        self._x_end_   = x_range[1]
        self._y_start_ = y_range[0]
        self._y_end_   = y_range[1]
        self._X_axis_1D  = None
        self._Y_axis_1D  = None
        self._X_axis_  = None
        self._Y_axis_  = None
        self._Z_axis_  = None
        self._Y_len_   = None
        self._X_len_   = None
        self._count_ = int(np.sqrt(count))
        self.__initialize__()

# =============================================================================        

    def __initialize__(self):
        X = np.linspace(self._x_start_ , self._x_end_, self._count_)
        Y = np.linspace(self._y_start_ , self._y_end_, self._count_)
        self._X_len_ = len(X)
        self._Y_len_ = len(Y)
        self._X_axis_1D = X.copy()
        self._Y_axis_1D = Y.copy()
        X, Y = np.meshgrid(X,Y)
        self._X_axis_, self._Y_axis_ = X, Y
        #self._Z_axis_ = self._function_(X,Y)

# =============================================================================        
    
    def plot_surface_color_3D(self, function, plot_separately = True, alpha=0.5):
        Z = function(self._X_axis_, self._Y_axis_)
        self._Z_axis_ = Z
        if(plot_separately): plt.figure()
        self.__plot_3D_curve__(self._X_axis_, self._Y_axis_, Z, alpha, function.__name__)

# =============================================================================        
        
    def plot_surface_lines_3d(self, function, density = 50, plot_separately = True):
        X,Y = self._X_axis_, self._Y_axis_
        Z = function(X,Y)
        self._Z_axis_ = Z
        if(plot_separately): plt.figure()
        ax = plt.gca(projection='3d')
        ax.contour3D(X, Y, Z, density, cmap='binary')
        self.__plot_3D__(ax, function.__name__)

# =============================================================================        

    def __plot_3D_curve__(self, X, Y, Z, alpha, title):
        ax = plt.gca(projection='3d')
        fig = plt.gcf()
        #ax = fig.add_subplot(111,projection='3d')
        ax.plot_surface(X, Y, Z, rstride=1, cstride=1, alpha=alpha, cmap='viridis', edgecolor='none')
        self.__plot_3D__(ax,title)

    def __plot_3D__(self,ax,title):
        plt.title(title)
        ax.set_xlabel("X-axis")
        ax.set_ylabel("Y-axis")
        ax.set_zlabel("Z-axis")
        ax.legend()
        plt.show()

    def __plot_2D__(self, function, X, Y, _label, plot_separately):
        if(plot_separately):
            plt.figure()
            plt.title(function.__name__)
        else:
            ax = plt.gca()
            try:
                ax.get_zlim() # => if current figure is of 3D
                plt.figure()  # So Create new fig
                plt.title(self._function_.__name__)
            except:
                pass
        plt.plot(X, Y, label= _label)
        plt.legend()
        plt.show()


# =============================================================================        

    def __get_Z_wrtX__(self,x_value, Z):
        dx = abs(self._X_axis_[0][0] - self._X_axis_[0][1])
        index = int(round((x_value - self._X_axis_1D[0]) / dx))
        return Z[:,index]

# =============================================================================        
    
    def __get_Z_wrtY__(self,y_value, Z):
        dy = abs(self._Y_axis_[0][0] - self._Y_axis_[1][0])
        index = int(round((y_value - self._Y_axis_1D[0]) / dy))
        return Z[index]

# =============================================================================        

    def __plot_function_wrt__(self, axis, value, wrt, Z, _label, plot_separately):
        if(plot_separately):
            fig = plt.figure()
            ax = fig.gca(projection='3d')
        else: ax = plt.gca(projection='3d')
        ax.plot(axis, Z, zs=value, zdir=wrt, label= _label)
        self.__plot_3D__(ax,_label)

# =============================================================================        
    
    def plot_function_wrtX(self,function, x_value, plot_2D_or_3D = '3D', plot_separately = True):
        X, Y = self._X_axis_, self._Y_axis_
        Z = function(X,Y)
        Z = self.__get_Z_wrtX__(x_value, Z)
        label = 'f(x,y)|x='+str(x_value)
        if(plot_2D_or_3D.lower() == '2d'):
            self.__plot_2D__(function, self._Y_axis_1D, Z, label, plot_separately)
        elif(plot_2D_or_3D.lower() == '3d'):
            self.__plot_function_wrt__(self._Y_axis_1D, x_value, 'x', Z, label, plot_separately)
        else: raise ValueError("'plot_2D_or_3D' must be either '2D' or '3D'")   

# =============================================================================        
        
    def plot_function_wrtY(self, function, y_value, plot_2D_or_3D = '3D', plot_separately = True):
        X, Y = self._X_axis_, self._Y_axis_
        Z = function(X,Y)
        Z = self.__get_Z_wrtY__(y_value,Z)
        label = 'f(x,y)|y='+str(y_value)
        if(plot_2D_or_3D.lower() == '2d'):
            self.__plot_2D__(function, self._X_axis_1D, Z, label, plot_separately)
        elif(plot_2D_or_3D.lower() == '3d'):
            self.__plot_function_wrt__(self._X_axis_1D, y_value, 'y', Z, label, plot_separately)
        else: raise ValueError("'plot_2D_or_3D' must be either '2D' or '3D'")   

# =============================================================================        

    def setZ_limit(self,limit_range):
        if(type(limit_range) != tuple): raise ValueError("limit_range must be of type 'tuple'")
        ax = plt.gca()
        ax.set_zlim(limit_range[0], limit_range[1])

    def setY_limit(self,limit_range):
        if(type(limit_range) != tuple): raise ValueError("limit_range must be of type 'tuple'")
        ax = plt.gca()
        ax.set_ylim(limit_range[0], limit_range[1])

    def setX_limit(self,limit_range):
        if(type(limit_range) != tuple): raise ValueError("limit_range must be of type 'tuple'")
        ax = plt.gca()
        ax.set_xlim(limit_range[0], limit_range[1])

    def set_axes_limit(self, limit):
        if(type(limit) != tuple): raise ValueError("limit must be of type 'tuple'")
        self.setX_limit(limit)
        self.setY_limit(limit)
        try:
            self.setZ_limit(limit)
        except:
            pass

# =============================================================================        

    def plot_3D_vectors(self, vectors, origin=np.array([0,0,0]), plot_separately=True):
        n = len(vectors)
        if(plot_separately):  fig = plt.figure()
        ax = plt.gca(projection='3d')
        for v in vectors:
            ax.quiver(
                      origin[0], origin[1], origin[2],
                      v[0] - origin[0], v[1] - origin[1], v[2] - origin[2],
                      arrow_length_ratio=0.1, alpha = .8, lw = 3,
                      )
            ### Thanks to this post so that we can add text to a vector: https://stackoverflow.com/a/42290328
            ax.text(v[0],v[1],v[2], str(v), style='italic', bbox={'facecolor':'red', 'alpha':0.5, 'pad':0.5})
            #ax.plot([origin[0], v[0]], [origin[0], v[1]], [origin[0], v[2]], alpha=0.8, lw=3)
        #plt.show()
        ax.scatter(origin[0],origin[1],origin[2])
        ax.set_xlabel("X-axis")
        ax.set_ylabel("Y-axis")
        ax.set_zlabel("Z-axis")
        colormap = plt.cm.gist_ncar #nipy_spectral, Set1,Paired  
        colorst = [colormap(i) for i in np.linspace(0, 0.9,len(ax.collections))] 
        for t,j1 in enumerate(ax.collections):
            j1.set_color(colorst[t])
        ax.legend(fontsize='small')
        
    def plot_3D_lines(self, lines, plot_separately=True):
        x_start, x_end = lines[:,0], lines[:,1]
        y_start, y_end = lines[:,2], lines[:,3]
        z_start, z_end = lines[:,4], lines[:,5]
        if(plot_separately): fig = plt.figure()
        ax = plt.gca(projection='3d')
        for i in range(len(lines)):
            ax.plot([x_start[i], x_end[i]], [y_start[i],y_end[i]],zs=[z_start[i],z_end[i]])
        
# =============================================================================        

    def plot_2D_vectors(self, vectors, origin=np.array([0,0]), plot_separately=True, head_width=0.05, head_length=0.1):
        n = len(vectors)
        if(plot_separately):  fig = plt.figure()
        ax = plt.axes()
        for v in vectors:
            ax.arrow(origin[0], origin[1],v[0] - origin[0], v[1] - origin[1], head_width=head_width, head_length=head_length, fc='k', ec='k')
            ax.text(v[0],v[1], str(v), style='italic', bbox={'facecolor':'red', 'alpha':0.5, 'pad':0.5})
        ax.scatter(origin[0],origin[1])
        ax.set_xlabel("X-axis")
        ax.set_ylabel("Y-axis")
        
        
    def fill_between(self, x, y1, y2, alpha=0.3):
        ax = plt.gca()
        ax.fill_between(x, y1, y2,  color='C0', alpha=0.3)
        ax.set_xlabel("X-axis")
        ax.set_ylabel("Y-axis")
# =============================================================================        

    def get_Z(self):
        return self._Z_axis_.copy()
    
    def getZ_wrtX(self, x_value, Z = None):
        if(type(Z) == type(None)): Z = self._Z_axis_
        return self.__get_Z_wrtX__(x_value, Z)
    
    def getZ_wrtY(self, y_value, Z = None):
        if(type(Z) == type(None)): Z = self._Z_axis_
        return self.__get_Z_wrtY__(y_value, Z)

# -*- coding: utf-8 -*-
"""
Created on Wed May 27 14:49:16 2020

@author: Me
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import gaussian_kde, norm
from mpl_toolkits.mplot3d import Axes3D
from matplotlib.collections import PolyCollection

def clt_hist(distribution, nlim, nbins = 50, title="", n_simulation = 100000):#, lim:: tuple, spaces = 1):
    """
    distribution: probability distribution (you should use from scipy.stats)
    nlim: n denoting n i.i.d. r.v.
    nbins: number of bins for our plot
    n_simulation: number of simulation
    title: title of plot
    """
    
    mean, std = distribution.mean(), distribution.std()
    
    # draw iid r.v. ~ distribution
    data = distribution.rvs((n_simulation, nlim))
    
    # now we have total "n_simulation" number of iid r.v.
    sample_means = data.mean(axis=1)
    
    # Generate observations of Y_j; j: [1,2,3, ..., n_simulation]
    Y = np.sqrt(nlim) * (sample_means - mean) / std
    
    # Plot
    fig, ax = plt.subplots(figsize=(10, 6))
    xmin, xmax = -4, 4
    ax.set_xlim(xmin, xmax)
    ax.hist(Y, bins=nbins, alpha=0.5, density=True)
    
    f_z = np.linspace(xmin, xmax, 200)
    ax.plot(f_z, norm.pdf(f_z), 'k-', lw=2, label='$N(0, 1)$')
    ax.set_title(title)
    ax.legend()
    plt.show()
 
def clt(distribution, ns, title="", n_simulation = 100000):#, lim:: tuple, spaces = 1):
    """
    distribution: probability distribution (you should use from scipy.stats)
    nlim: n denoting n i.i.d. r.v.
    n_simulation: number of simulation
    title: title of plot
    """
    
    nlim = max(ns)
    
    Z = distribution.rvs((nlim, n_simulation))
    mean, std = np.array([Z.mean(axis=1)]).T, np.array([Z.std(axis=1)]).T
    Z = (Z - mean)/std
    Z = Z.T
    Y = (1/np.sqrt(list(range(1, nlim + 1))))*Z.cumsum(axis=1)
    
    # Plot
    fig = plt.figure()
    ax = fig.gca(projection='3d')
    
    xmin, xmax = -3, 3
    n_ = 100
    xs = np.linspace(xmin, xmax, n_)
    xy_axis = []    
    for n in ns:
        # Learn more about Kernel Density Estimation(KDE) : Non Parametric Statistical Estimation here
        # https://www.youtube.com/watch?v=oxSxX1jbbPs
        density = gaussian_kde(Y[:, n-1])
        ys = density(xs)
        xy_axis.append(list(zip(xs, ys)))
    
    poly = PolyCollection(xy_axis, facecolors=[str(g) for g in reversed(np.linspace(0.3, 0.9, len(ns)))])
    ax.add_collection3d(poly, zs=ns, zdir='x')
    
    ax.set(xlim3d=(1, nlim), xticks=(ns), ylabel='$Y_n$', zlabel='$p(y_n)$',
           xlabel=("n"), yticks=((-3, 0, 3)), ylim3d=(xmin, xmax),
           zlim3d=(0, 0.4),alpha=0.85)
    ax.set_title(title)
    plt.show()
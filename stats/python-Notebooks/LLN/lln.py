# -*- coding: utf-8 -*-
"""
Created on Wed May 27 13:06:12 2020

@author: Me
"""
import numpy as np
import matplotlib.pyplot as plt

def lln(distribution, ns, name=""):
    
    plt.figure()
    mean, std = distribution.mean(), distribution.std()
    
    nlim = len(ns)
    
    # Generate n i.i.d. random variables from the distribution
    iid_rv = distribution.rvs(nlim)
    
    # sample mean for each n
    sample_mean = []
    for n in range(nlim):
        sample_mean.append(np.mean(iid_rv[:n+1]))
    
    plt.plot(ns, iid_rv, 'o', color='grey', alpha=0.5)
    label = '$\\bar X_n$ for $X_i \sim$' + name
    plt.plot(ns, sample_mean, 'g-', lw=3, alpha=0.6, label=label)
    plt.plot(ns, [mean] * nlim, 'k--', lw=1.5, label='$\mu$')
    plt.vlines(ns, mean, iid_rv, lw=0.2)
    
    
    bbox = (0.0, 1.0 , 1.0, 0.1)
    legend_args = {'ncol': 2,
                   'bbox_to_anchor': bbox,
                   'mode': 'expand'}
    
    plt.legend(**legend_args, fontsize=12)

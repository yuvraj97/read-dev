# -*- coding: utf-8 -*-
"""
Created on Wed May 27 13:11:44 2020

@author: Me
"""

from scipy.stats import bernoulli, geom, binom, poisson
from scipy.stats import beta, expon, uniform, cauchy, norm, chi2
from lln import lln

p = 0.5
distribution = bernoulli(p)
nlim=100
lln(distribution, nlim, f'$Ber(p={p})$')

p = 0.5
distribution = geom(p)
nlim=100
lln(distribution, nlim, f'$Geo(p={p})$')

n, p = 5, 0.5
distribution = binom(n, p)
nlim=100
lln(distribution, nlim, f'$Bin(n={n},p={p})$')

_lambda = 1
distribution = poisson(_lambda)
nlim=100
lln(distribution, nlim, f'$poisson(\lambda={_lambda})$')


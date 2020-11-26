# -*- coding: utf-8 -*-
"""
Created on Thu May 28 17:58:35 2020

@author: Me
"""


from scipy.stats import bernoulli, geom, binom, poisson
from scipy.stats import beta, expon, uniform, cauchy, norm, chi2
from clt import clt

# Discreat r.v.

p = 0.5
distribution = bernoulli(p)
ns = [2,40, 80, 120]
clt(distribution, ns, title=f'$Ber(p={p})$')


p = 0.5
distribution = geom(p)
ns = [2, 3, 6, 9]
clt(distribution, ns, title=f'$Geo(p={p})$')

n, p = 10, 0.5
distribution = binom(n,p)
ns = [2, 3, 6, 9]
clt(distribution, ns, title=f'$Bin(n={n}, p={p})$')

_lambda = 5 
distribution = poisson(_lambda)
ns = [2, 3, 6, 9]
clt(distribution, ns, title=f'$poisson(\lambda={_lambda})$')


# Continuous r.v.

_lambda = 5
distribution = expon(_lambda)
ns = [1, 2, 4, 6, 8]
clt(distribution, ns, title=f'$Exp(\lambda = {_lambda})$')

a, b = 0, 1
distribution = uniform(a, b)
ns = [1, 2, 4, 6, 8]
clt(distribution, ns, title=f'$Unif([{a},{b}])$')

mu, sigma = 5, 10
distribution = norm(mu, sigma)
ns = [1, 2, 4, 6, 8]
clt(distribution, ns, title=f'$N({mu},{sigma})$')


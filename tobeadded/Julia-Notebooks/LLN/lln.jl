using Plots, Distributions, Random, Statistics, LinearAlgebra
gr(fmt = :png, size = (900, 500))

function plot_cont_distribution(distribution, plot_seprately = true, clr = :blue)
    """ plot continuous distribution """

    title = nameof(typeof(distribution))

    """
    quantile of random variable 𝐗 (𝐗 ∼ distridution) of level β:
    ℙ(𝐗 ≦ qᵦ(𝐗)) = β
    """
    β = [0.01, 0.99]
    low, high = quantile.(distribution, β)

    x = range(low, high; length = 100)
    y = pdf.(distribution, x)
    if plot_seprately
        plot(x, y, color=clr,  label=title)
    else
        plot!(x, y, color=clr,  label=title)
    end

end

function lln(distribution, n = 100)
    """ Law of Large Numbers """
    μ, σ = mean(distribution), √var(distribution)
    title = nameof(typeof(distribution))
    x_axis = 1:n

    """ "observations" is vector of observation X₍₁₎, X₍₂₎, ..., X₍ₙ₎ """
    observations = rand(distribution, n)

    """ "running_average" is vector of running average ̅X₍₁₎, ̅X₍₂₎, ..., ̅X₍ₙ₎ """
    running_average = cumsum(observations) ./ (x_axis) .- μ
    abs_running_averages = broadcast(abs, running_average)

    """ plot vertical line for every observation - μ;   X₍₁₎ - μ, X₍₂₎ - μ, ⋯ X₍ₙ₎ - μ"""
    plot(repeat((x_axis)', 2), [zeros(1, n); (observations .- μ)'], label = "", color = :grey, alpha = 0.4)

    """ plot observation - μ;   X₍₁₎ - μ, X₍₂₎ - μ, ⋯ X₍ₙ₎ - μ"""
    plot!(x_axis, observations .- μ, color = :grey, markershape = :circle, alpha = 0.5, label = "", linewidth = 0)

    """ plot dashed line ay y=0 """
    hline!([0], color = :black, linewidth = 1.5, linestyle = :dash, grid = false, label = "")

    plot!(x_axis, abs_running_averages, linewidth = 3, alpha = 0.6, color = :green,
          label = "| ̅Xₙ - μ |")
    xlabel!("n")
    ylabel!("| ̅Xₙ - μ |")
    plot!(title = title)
end

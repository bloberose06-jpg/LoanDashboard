with loans as (

    select * from {{ ref('stg_loans') }}

),

summary as (

    select
        purpose,

        count(*) as total_loans,
        sum(not_fully_paid) as loans_not_fully_paid,
        round(100.0 * sum(not_fully_paid) / count(*), 2) as default_rate_pct,

        round(avg(int_rate)::numeric * 100, 2) as avg_interest_rate_pct,
        round(avg(fico)::numeric, 0) as avg_fico_score,
        round(avg(dti)::numeric, 2) as avg_dti,
        round(avg(installment)::numeric, 2) as avg_installment

    from loans
    group by purpose

)

select * from summary
order by default_rate_pct desc
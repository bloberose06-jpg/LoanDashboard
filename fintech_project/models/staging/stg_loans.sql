with source as (

    select * from {{ source('public', 'raw_loans') }}

),

renamed as (

    select
        "credit.policy"      as credit_policy,
        purpose,
        "int.rate"           as int_rate,
        installment,
        "log.annual.inc"     as log_annual_inc,
        dti,
        fico,
        "days.with.cr.line"  as days_with_cr_line,
        "revol.bal"          as revol_bal,
        "revol.util"         as revol_util,
        "inq.last.6mths"     as inq_last_6mths,
        "delinq.2yrs"        as delinq_2yrs,
        "pub.rec"            as pub_rec,
        "not.fully.paid"     as not_fully_paid

    from source

)

select * from renamed
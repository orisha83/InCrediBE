const config = require('../database/config')
const sql = require('mssql')

async function getResQ1()
{
    try{
        let pool = await sql.connect(config)
        let data = await pool.request().query("select pvt.ParentId, pvt.[2015] as YEAR_2015, pvt.[2016] as YEAR_2016, pvt.[2017] as YEAR_2017, pvt.[2018] as YEAR_2018, pvt.[2019] as YEAR_2019,  pvt.[2020] as YEAR_2020, pvt.[2021] as YEAR_2021, pvt.[2022] as YEAR_2022, pvt.[2023] as YEAR_2023, pvt.TOTAL as YEAR_TOTAL from (select ParentId, isnull(convert(varchar,year(date)),'TOTAL') as year, SUM(sum) as sum from [Assignmentdb].[dbo].[Index] group by cube(YEAR(Date), ParentId)) as a pivot(SUM(SUM) for [year] in ( [2015], [2016], [2017],[2018],[2019],[2020],[2021],[2022],[2023],\"TOTAL\")) as pvt where ParentId is not null and pvt.TOTAL > 0") 
        return data.recordsets[0]
    }
    catch(error){
        console.log(error)
    }
}

async function getResQ2InitData()
{
    try{
        let pool = await sql.connect(config)
        let data = await pool.request().query("select ParentId, CONVERT(varchar, date, 111) as date, sum (sum) as sum_per_day from [Assignmentdb].[dbo].[Index] a group by ParentId, CONVERT(varchar, date, 111) order by ParentId,CONVERT(varchar, date, 111) desc") 
        return data.recordsets[0]
    }
    catch(error){
        console.log(error)
    }
}

async function getResQ2DistinctParentData()
{
    try{
        let pool = await sql.connect(config)
        let data = await pool.request().query("select distinct ParentId from [Assignmentdb].[dbo].[Index]") 
        return data.recordsets[0]
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {getResQ1, getResQ2InitData, getResQ2DistinctParentData}
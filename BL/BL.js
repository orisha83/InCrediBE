const dbDAL = require('../DALs/dbDAL')

const getq1ResData = async function()
{
    let res = await dbDAL.getResQ1()
    console.log("BL")
    console.log(res)
    return res
}

const getq2InitData = async function()
{
    let res = await dbDAL.getResQ2InitData()
    //console.log(res)
    return res
}

const getq2distinctParentData = async function()
{
    let res = await dbDAL.getResQ2DistinctParentData()
    //console.log(res)
    return res
}

const q2DataCalc = async function()
{
    let q2ParentIds = await getq2distinctParentData()
    console.log(q2ParentIds)
    let q2Data = await getq2InitData()
    console.log(q2Data)
    let returnObj = []
    let currDate
    let currSum
    let nextDate
    let nextSum
    let currObj
    let parentObj = []
    let parentAllYearsAvg
    let count

    q2ParentIds.forEach(parentId => {
        console.log(parentId)
        let filteredDataPerParent = q2Data.filter(x => x.ParentId == parentId.ParentId)
        if(filteredDataPerParent.length > 0)
        {
            parentObj = []
            parentAllYearsAvg = 0
            count = 0
            filteredDataPerParent.forEach(function(item, index)
            {
                currDate = item.date
                currSum = item.sum_per_day
                if(filteredDataPerParent[index+1])
                {
                    nextDate = filteredDataPerParent[index+1].date
                    nextSum = filteredDataPerParent[index+1].sum_per_day

                    changePercent = Math.trunc(((currSum / nextSum) - 1 ) * 100)
                    parentAllYearsAvg += changePercent
                    count++
                    currObj = {currentDate : currDate, changePercentOnDate : changePercent}
                    parentObj.push(currObj)
                }
                else
                {
                    currObj = {currentDate : currDate, changePercentOnDate : 100}
                    parentObj.push(currObj)
                    parentAllYearsAvg += 100
                    count++
                    let avg = Math.trunc(parentAllYearsAvg/count)
                    if(avg > 0 )
                    {
                        currObj = {currentDate : 'all_years' , changePercentOnDate : avg}
                        parentObj.push(currObj)
                        returnObj.push({parentId : parentId.ParentId, data : parentObj})
                    }
                }
            })

        }
    });
    console.log(returnObj)

    
    return returnObj
}


//q2DataCalc()

module.exports = {getq1ResData, q2DataCalc}
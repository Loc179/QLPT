using System;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace QLPT.Data.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly QlptDbContext _context;
	protected readonly DbSet<T> _dbSet;

	public GenericRepository(QlptDbContext context)
	{
		_context = context;
		_dbSet = _context.Set<T>();
	}

	public void Add(T entity)
	{
		_dbSet.Add(entity);
	}

	public void Delete(int id)
	{
		var entity = GetById(id);
		if (entity != null) _dbSet.Remove(entity);
	}

	public void Delete(T entity)
	{
			_dbSet.Remove(entity);
	}

	public void Delete(Expression<Func<T, bool>> where)
	{
		var entities = GetQuery(where).AsEnumerable();
		foreach (var entity in entities)
		{
			Delete(entity);
		}
	}

	public IQueryable<T> Get(Expression<Func<T, bool>>? filter = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, string includeProperties = "")
	{
		IQueryable<T> query = _dbSet;
		if (filter != null)
			query = query.Where(filter);

		foreach (var includeProperty in includeProperties
					.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
		{
			query = query.Include(includeProperty);
		}

		if (orderBy != null)
			query = orderBy(query);

		return query;
	}

	public IEnumerable<T> GetAll()
	{
		return _dbSet.ToList();
	}

	public async Task<IEnumerable<T>> GetAllAsync()
	{
		return await _dbSet.ToListAsync();
	}

	public T? GetById(int id)
	{
		return _dbSet.Find(id);
	}

	public async Task<T?> GetByIdAsync(int id)
	{
		return await _dbSet.FindAsync(id);
	}

	public IQueryable<T> GetQuery()
	{
		return _dbSet.AsQueryable();
	}
	
	public IQueryable<T> GetQuery(Expression<Func<T, bool>> predicate)
	{
		return _dbSet.Where(predicate);
	}

	public void Update(T entity)
	{
		_dbSet.Update(entity);
	}

	public void AddRange(T[] entities)
	{
		_dbSet.AddRange(entities);
	}

	public IQueryable<T> GetAllQuery()
	{
		return _dbSet.AsQueryable();
	}
}
